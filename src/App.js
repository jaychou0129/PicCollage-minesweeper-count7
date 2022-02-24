import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import PageSelection from "./pages/PageSelection";
import Minesweeper from "./pages/Minesweeper";
import Count7 from "./pages/Count7";
import NotFound from "./pages/NotFound"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PageSelection />} />
          <Route path="/minesweeper" element={<Minesweeper />} />
          <Route path="/count7" element={<Count7 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
