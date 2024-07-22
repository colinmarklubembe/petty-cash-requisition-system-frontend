import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RequisitionsPage from "../pages/RequisitionsPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/requisitions" element={<RequisitionsPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
