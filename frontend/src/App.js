import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './css/card.css';
import './index.css';
import getUserInfo from "./utilities/decodeJwt";
import Navbar from "./components/navbar";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import MovieMatch from "./components/pages/MovieMatch";
import ProfilePage from "./components/pages/profilePage";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      {/* Pass the user object to the Navbar */}
      <Navbar user={user} />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/MovieMatch" />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/MovieMatch" element={<MovieMatch user={user} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;