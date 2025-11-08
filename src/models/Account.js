import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

const Account = mongoose.model("Account", AccountSchema);

export default Account;
