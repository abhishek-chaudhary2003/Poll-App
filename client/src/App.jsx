import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from "./page/CreatePoll.jsx";
import PollRoom from "./page/PollRoom.jsx";
import Results from "./page/Results.jsx";
import Navbar from "./component/Navbar.jsx";
function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50">
     <Navbar />
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollRoom />} />
        <Route path="/results/:id" element={<Results />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
