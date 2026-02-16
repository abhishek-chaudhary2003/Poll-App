import Poll from "../models/poll.js";
import Vote from "../models/vote.js";
import { hashIp } from "../utils/hashIp.js";
import { io } from "../index.js";
export const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || options.lenght < 2) {
      return req.statu(400).json({ message: "Invalid poll data" });
    }

    const poll = await Poll.create({
      question,
      options: options.map((text) => ({ text })),
    });

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.statu(404).json({ message: "Poll not found" });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const votePoll = async (req, res) => {
  try {
    const { optionId, voterId } = req.body;
    const pollId = req.params.id;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ipHash = hashIp(ip);

    const existingVote = await Vote.findOne({
      pollId,
      $or: [{ voterId }, { ipHash }],
    });

    if (existingVote) {
      return res.status(403).json({ message: "you already voted" });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const option = poll.options.id(optionId);
    if (!option) return res.status(400).json({ message: "Invalid option" });

    option.votes += 1;
    await poll.save();

    await Vote.create({ pollId, optionId, voterId, ipHash });

    io.to(pollId).emit("voteUpdated", poll);

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
