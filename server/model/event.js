const mongoose = require("./index");

const { Schema } = mongoose;

const schema = new Schema({
  title: String,
  date: { type: Date, default: Date.now() },
  venue: String,
});

const event = mongoose.model("Event", schema);

module.exports = event;
