import { Types } from "mongoose";
import { Transaction } from "../models/Transaction";

export const reportService = {
  // Total agrupado por tipo de transação
  async getTotalsByType(accountId: string) {
    const accountObjectId = new Types.ObjectId(accountId);

    const result = await Transaction.aggregate([
      {
        $match: {
          $or: [
            { fromAccount: accountObjectId },
            { toAccount: accountObjectId },
          ],
        },
      },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    return result;
  },
};
