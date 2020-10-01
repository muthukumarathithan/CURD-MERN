const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvestorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  Investor: {
    type: String,
  },
  Plan: {
    type: String
  },
  Term: {
    type: String
  },
  Amount: {
    type: String
  },
  Totalreturns: {
    type: String,
  },
  Maturity: {
    type: String
  },
  Status: {
    type: String
  },
  Time: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Investor = mongoose.model("investor", InvestorSchema);
