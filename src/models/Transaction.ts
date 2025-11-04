import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  fromAccount?: Types.ObjectId;
  toAccount?: Types.ObjectId;
  type: "DEPOSITO" | "SAQUE" | "TRANSFERENCIA";
  amount: number;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    fromAccount: { type: Schema.Types.ObjectId, ref: "Account" },
    toAccount: { type: Schema.Types.ObjectId, ref: "Account" },
    type: {
      type: String,
      enum: ["DEPOSITO", "SAQUE", "TRANSFERENCIA"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0.01 },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
