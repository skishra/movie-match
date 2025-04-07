import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login state
  const [profile, setProfile] = useState({
    email: "user@example.com", // Replace with actual user data
    name: "John Doe",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg", // Default profile picture
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Toggle dropdown visibility

  const handleProfileClick = () => {
    console.log("Profile icon clicked!"); // Debugging log
    if (!isLoggedIn) {
      navigate("/signup"); // Redirect anonymous users to the signup page
    } else {
      setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate logout
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container mt-5" style={{ textAlign: "center" }}>
      <h2>Profile Page</h2>

      {/* Profile Icon */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleProfileClick}
      >
        <img
          src={profile.profilePicture}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <span style={{ color: "#555", fontSize: "14px" }}>{profile.name}</span>
      </div>

      {/* Dropdown Menu for Logged-In Users */}
      {isLoggedIn && isDropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
              }}
              onClick={() => navigate("/profile")}
            >
              Profile Setting
            </li>
            <li
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
              }}
              onClick={() => navigate("/favorites")}
            >
              My Favorite
            </li>
            <li
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Log Out
            </li>
          </ul>
        </div>
      )}

      {/* Profile Details */}
      <form>
        <div className="mb-3">
          <label>Email Address (disabled)</label>
          <input
            type="email"
            className="form-control"
            value={profile.email}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label>Profile Picture URL</label>
          <input
            type="text"
            className="form-control"
            name="profilePicture"
            value={profile.profilePicture}
            onChange={(e) =>
              setProfile({ ...profile, [e.target.name]: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;