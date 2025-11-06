import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAccount extends Document {
  userId: Types.ObjectId;
  balance: number;
  creditLimit: number;
  accountType: "CORRENTE" | "POUPANCA";
  goalDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, default: 0 },
    creditLimit: { type: Number, default: 0 },
    accountType: {
      type: String,
      enum: ["CORRENTE", "POUPANCA"],
      default: "CORRENTE",
    },
    goalDescription: { type: String, required: false },
  },
  { timestamps: true }
);

export const Account = mongoose.model<IAccount>("Account", AccountSchema);
