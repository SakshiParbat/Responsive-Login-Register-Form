import React from "react";
import Signup from "./components/Signup";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* Routing */}
      <BrowserRouter>
        {/* Toaster */}
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
