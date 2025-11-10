import { Types } from "mongoose";
import reportService from "../../../services/reportService.js";
import Transaction from "../../../models/Transaction.js";
import { jest } from "@jest/globals";

describe("reportService.getTotalsByType", () => {
  it("deve agrupar e retornar totais por tipo de transação", async () => {
    const accountId = new Types.ObjectId();

    const mockAggregationResult = [
      { _id: "deposit", totalAmount: 300, count: 2 },
      { _id: "transfer", totalAmount: 200, count: 1 },
    ];

    jest
      .spyOn(Transaction, "aggregate")
      .mockResolvedValue(mockAggregationResult);

    const result = await reportService.getTotalsByType({ accountId });

    expect(Transaction.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          $or: [{ fromAccount: accountId }, { toAccount: accountId }],
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

    expect(result).toEqual(mockAggregationResult);
  });

  it("deve retornar um array vazio quando não houver transações", async () => {
    const accountId = new Types.ObjectId();

    jest.spyOn(Transaction, "aggregate").mockResolvedValue([]);

    const result = await reportService.getTotalsByType({ accountId });

    expect(Transaction.aggregate).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
