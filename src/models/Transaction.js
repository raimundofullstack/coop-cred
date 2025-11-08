import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    toAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    type: {
      type: String,
      enum: ["DEPOSITO", "SAQUE", "TRANSFERENCIA"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0.01 },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
