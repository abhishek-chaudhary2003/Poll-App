import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../utils/socket";
import { getVoterId } from "../utils/getVoterId";
import { useParams } from "react-router-dom";

export default function PollRoom() {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  const voterId = getVoterId();

  useEffect(() => {
    fetchPoll();

    socket.emit("joinPoll", id);

    const handleUpdate = (updatedPoll) => {
      setPoll(updatedPoll);
    };

    socket.on("voteUpdated", handleUpdate);

    return () => {
      socket.off("voteUpdated", handleUpdate);
    };
  }, [id]);

  const fetchPoll = async () => {
    try {
      const res = await axios.get(`https://backendpoll.onrender.com/api/polls/${id}`);
      setPoll(res.data);
    } catch (err) {
      console.error("Failed to fetch poll:", err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (optionId) => {
    try {
      await axios.post(`https://backendpoll.onrender.com/api/polls/${id}/vote`, {
        optionId,
        voterId,
      });

      setHasVoted(true);
    } catch (err) {
      if (err.response?.status === 403) {
        setAlreadyVoted(true);
        setHasVoted(true);
      } else {
        console.error("Vote failed:", err);
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading poll...</div>;
  }

  if (!poll || !Array.isArray(poll.options)) {
    return <div className="p-6 text-center">Poll not found</div>;
  }

  const totalVotes = poll.options.reduce(
    (acc, opt) => acc + (opt.votes || 0),
    0
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{poll.question}</h1>

      {alreadyVoted && (
        <p className="text-red-600 mb-4 font-medium">
          You already voted in this poll
        </p>
      )}

      {poll.options.map((opt) => {
        const percent = totalVotes
          ? ((opt.votes / totalVotes) * 100).toFixed(1)
          : 0;

        return (
          <div key={opt._id} className="mb-4">
            <button
              disabled={hasVoted}
              onClick={() => vote(opt._id)}
              className="w-full border p-3 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {opt.text}
            </button>

            <div className="text-sm text-gray-600 mt-1">
              {opt.votes || 0} votes ({percent}%)
            </div>

            {/* progress bar */}
            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
