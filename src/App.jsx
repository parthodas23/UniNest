import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassward from "./pages/ForgotPassward";
import SignUp from "./pages/SignUp";
import ListRoom from "./pages/ListRoom";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";
import { ToastContainer, Bounce } from "react-toastify";
import SetupProfile from "./pages/SetupProfile";
import CreateListing from "./pages/CreateListing";
import EditListings from "./pages/EditListings";
import Listing from "./pages/Listing";
import Category from "./pages/Category";

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
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/profile" element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassward />} />
          <Route path="/setup-profile" element={<SetupProfile />} />
          <Route path="/create-list" element={<PrivateRoutes />}>
            <Route path="/create-list" element={<CreateListing />} />
          </Route>
          <Route path="/edit-listings" element={<PrivateRoutes />}>
            <Route
              path="/edit-listings/:listingId"
              element={<EditListings />}
            />
          </Route>
          <Route
            path="/category/:categoryName"
            element={<Category />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
