import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Results() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios.get(`/api/polls/${id}`).then(res => setPoll(res.data));
  }, [id]);

  if (!poll) return <div className="p-6">Loading...</div>;

  const totalVotes = poll.options.reduce((a, o) => a + o.votes, 0);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>

      {poll.options.map(opt => {
        const percent = totalVotes
          ? ((opt.votes / totalVotes) * 100).toFixed(1)
          : 0;

        return (
          <div key={opt._id} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{opt.text}</span>
              <span>{percent}%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                style={{ width: `${percent}%` }}
                className="bg-black h-3 rounded"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
