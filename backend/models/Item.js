const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  itemName: String,
  description: String,
  type: {
    type: String,
    enum: ["Lost", "Found"]
  },
  location: String,
  date: {
    type: Date,
    default: Date.now
  },
  contactInfo: String
});

module.exports = mongoose.model("Item", itemSchema);