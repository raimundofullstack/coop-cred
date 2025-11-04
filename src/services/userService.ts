import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";

interface AuthResponse {
  user: Record<string, any>;
  token: string;
}

export const userService = {
  async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<AuthResponse> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await User.findOne({ email });
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

function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret não configurada (process.env.JWT_SECRET)");
  }
  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    "1h") as jwt.SignOptions["expiresIn"];
  return jwt.sign({ id: userId }, secret, { expiresIn });
}
