import React, { createContext, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar"; // Import Navbar
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import ProfilePage from "./components/pages/profilePage";
import MovieMatch from "./components/pages/MovieMatch";
import FavoriteMovie from "./components/favoriteMovies/favoriteMovies";
import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null); // User state

  useEffect(() => {
    const loggedInUser = getUserInfo(); // Fetch user data from JWT
    setUser(loggedInUser); // Update state with user data
  }, []); // Run once when the component is mounted

  return (
    <>
      {/* Pass the user object to the Navbar */}
      <Navbar user={user} />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<MovieMatch />} />
          {/*<Route exact path="/" element={<LandingPage />} />*/}
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/MovieMatch" element={<MovieMatch />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favoriteMovie" element={<FavoriteMovie />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
