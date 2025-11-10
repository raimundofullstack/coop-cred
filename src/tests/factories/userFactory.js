// import bcrypt from "bcryptjs";
//import User from "../../models/User.js";
import userService from "../../services/userService";

export const createUser = async (overrides = {}) => {
  const defaultUser = {
    name: "Usuário Teste",
    email: `user${Date.now()}@test.com`,
    password: "123456", //await bcrypt.hash("123456", 10),
  };

  return await userService.register({ ...defaultUser, ...overrides });
};
