import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/SearchPage";
import ResultPage from "./components/ResultPage";
import AdminPage from "./components/AdminPage";
import RidesPage from "./components/RidesPage";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<SearchPage />} />
          <Route path="/results" element={<ResultPage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/rides" element={<RidesPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
