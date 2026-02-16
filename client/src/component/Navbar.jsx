import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [pollId, setPollId] = useState(null);

  useEffect(() => {
    setPollId(localStorage.getItem("lastPollId"));
  }, []);

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      pathname.startsWith(path)
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Poll App</h1>

        <div className="flex gap-2">
          <Link to="/" className={linkStyle("/")}>
            Create Poll
          </Link>

          <Link to={`/results/${pollId}`} className={linkStyle("/results")}>
            View Results
          </Link>
        </div>
      </div>
    </nav>
  );
}
