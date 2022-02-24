import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageSelection from "./pages/PageSelection";
import Minesweeper from "./pages/Minesweeper";
import Count7 from "./pages/Count7";
import NotFound from "./pages/NotFound"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/PicCollage-minesweeper-count7/" element={<PageSelection />} />
          <Route path="/PicCollage-minesweeper-count7/minesweeper" element={<Minesweeper />} />
          <Route path="/PicCollage-minesweeper-count7/count7" element={<Count7 />} />
          <Route path="/PicCollage-minesweeper-count7/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
