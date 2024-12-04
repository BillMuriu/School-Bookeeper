// src/App.jsx
import React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import Pdf from "./pdf-apps/operations/cashbooks/Pdf";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/operations-cashbook-pdfs">Operations Cashbook PDFs</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/operations-cashbook-pdfs" element={<Pdf />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
