import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassward from "./pages/ForgotPassward";
import SignUp from "./pages/SignUp";
import ListRoom from "./pages/ListRoom";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/list-room" element={<ListRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassward />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
