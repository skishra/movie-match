import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './css/card.css';
import "./css/favoriteMovie.css";
import './index.css';

import getUserInfo from "./utilities/decodeJwt";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import MovieMatch from "./components/pages/MovieMatch";


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
          <Route path="/MovieMatch" element={<MovieMatch />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};


export default App
