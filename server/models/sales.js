const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
  },
  age: {
    type: String
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sales = mongoose.model("sales", SalesSchema);
