import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // Fetch the current user's profile on component mount
  useEffect(() => {
    const user = getUserInfo();
    if (user) {
      setProfile(user); // Set the profile state with the logged-in user's info
    } else {
      navigate("/login"); // Redirect to login if user is logged in
    }
  }, [navigate]);

  const handleUpdate = () => {
    // Navigate to the update profile page
    navigate("/updateProfile");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      // Call API to delete profile
      axios
        .delete(`/api/users/${profile.id}`)
        .then(() => {
          alert("Profile deleted successfully.");
          localStorage.removeItem("accessToken");
          navigate("/signup"); // Redirect to signup after deletion
        })
        .catch((err) => {
          console.error("Error deleting profile:", err);
          alert("Failed to delete profile. Please try again.");
        });
    }
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container mt-5" style={{ textAlign: "center" }}>
      <h2 style={{ color: "#f4c430" }}>Profile Page</h2>
      <p style={{ color: "#f4c430" }}>
        <strong>Username:</strong> {profile.username}
      </p>
      <p style={{ color: "#f4c430" }}>
        <strong>Email:</strong> {profile.email}
      </p>
      <button
        onClick={handleUpdate}
        style={{
          backgroundColor: "#3a0d0d",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          marginRight: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Update Profile
      </button>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default ProfilePage;