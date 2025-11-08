import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";

export const createUser = async (overrides = {}) => {
  const defaultUser = {
    name: "Usuário Teste",
    email: `user${Date.now()}@test.com`,
    password: await bcrypt.hash("123456", 10),
  };

  return await User.create({ ...defaultUser, ...overrides });
};
