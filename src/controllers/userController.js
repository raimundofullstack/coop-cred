import userService from "../services/userService.js";

const userController = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const data = await userService.register({ name, email, password, role });
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await userService.login({ email, password });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
export default userController;
