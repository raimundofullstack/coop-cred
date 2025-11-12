import userService from "../services/userService.js";
import logger from "../config/logger.js";

const userController = {
  async register(req, res, next) {
    const { name, email, password, role } = req.body;
    logger.info(
      `Iniciando a criação de um usuário. Name: ${name}, Email: ${email}, Role: ${role}, `
    );
    try {
      const data = await userService.register({ name, email, password, role });
      logger.info(`Usuário criado. User: ${data.user._id}`);
      res.status(201).json(data);
    } catch (error) {
      logger.warn(`Erro na criação do usuário: ${error.message}`);
      next(error);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    logger.info(`Iniciando login. Email: ${email}`);
    try {
      const data = await userService.login({ email, password });
      logger.info(`Usuário logado. User: ${data.user._id}`);
      res.status(200).json(data);
    } catch (error) {
      logger.warn(`Erro no login: ${error.message}`);
      next(error);
    }
  },
};
export default userController;
