import reportService from "../services/reportService.js";

const reportController = {
  async totalsByType(req, res) {
    try {
      const { accountId } = req.params;
      const result = await reportService.getTotalsByType(accountId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default reportController;
