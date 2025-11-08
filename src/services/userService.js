import User from "../models/User.js";
import jwt from "jsonwebtoken";
import accountService from "./accountService.js";

const userService = {
  async register(name, email, password, role) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user.toObject();

    await accountService.createAccount(user._id.toString(), "CORRENTE", 1000);

    return { user: userWithoutPassword, token };
  },

  async login(email, password) {
    const user = await User.findOne({ email });
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo de delay

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Senha inválida");
    }

    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  },
};

function generateToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret não configurada (process.env.JWT_SECRET)");
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  return jwt.sign({ id: userId }, secret, { expiresIn });
}

export default userService;
