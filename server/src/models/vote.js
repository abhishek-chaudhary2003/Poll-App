import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
  optionId: { type: String },
  voterId: { type: String },
  ipHash: { type: String },
});

export default mongoose.model("vote", voteSchema);
