import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const optionSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  text: { type: String },
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    validate: (v) => v.length >= 2,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("poll", pollSchema);
