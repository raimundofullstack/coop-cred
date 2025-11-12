import User from "../models/User.js";
import jwt from "jsonwebtoken";
import accountService from "./accountService.js";
import AppError from "../errors/AppError.js";

const userService = {
  async register({ name, email, password, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("EXISTING_USER", "Email já cadastrado");
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user.toObject();

    await accountService.createAccount({
      userId: user._id.toString(),
      accountType: "CORRENTE",
      creditLimit: 200,
    });

    return { user: userWithoutPassword, token };
  },

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("USER_NOT_FOUND", "Usuário não encontrado", 400);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("PASSWORD_INCORRET", "Senha inválida", 400);
    }

    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  },
};

function generateToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError(
      "JWT_NOT_CONFIGURED",
      "JWT secret não configurada (process.env.JWT_SECRET)",
      400
    );
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  return jwt.sign({ id: userId }, secret, { expiresIn });
}

export default userService;
