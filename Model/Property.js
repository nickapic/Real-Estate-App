const mongoose = require("mongoose");

const PropertyScehma = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
  },
  purpose: {
    type: String,
    enum: ["sell", "rent"],
    required: true,
  },
});

module.exports = Property = mongoose.model("property", PropertyScehma);
