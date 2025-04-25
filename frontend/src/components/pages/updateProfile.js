import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import getUserInfo from "../../utilities/decodeJwt";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#f4c430";
const SECONDARY_COLOR = "#3a0d0d";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = getUserInfo();
    if (user && user.username && user.email) {
      setProfile({ username: user.username, email: user.email, password: "" });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = ({ currentTarget: input }) => {
    setProfile({ ...profile, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = getUserInfo();

      if (!user?.id) {
        setError("User ID not found. Please login again.");
        return;
      }

      const updateData = {
        userId: user.id,
        email: profile.email,
      };

      if (profile.password.trim() !== "") {
        updateData.password = profile.password;
      }

      console.log("Sending updateData:", updateData);

      const response = await axios.post(
        "http://localhost:8081/user/editUser",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);

        const decoded = jwt_decode(response.data.accessToken);
        setProfile({ username: decoded.username, email: decoded.email, password: "" });
      }

      setSuccess("Profile updated successfully.");
      setError("");

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
      setSuccess("");
    }
  };

  const labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  };

  const buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: SECONDARY_COLOR,
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom vh-100">
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          style={{ background: SECONDARY_COLOR }}
        >
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h2 style={{ color: PRIMARY_COLOR, textAlign: "center" }}>Update Profile</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label style={labelStyling}>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={profile.username}
                  disabled
                  placeholder="Username cannot be changed"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label style={labelStyling}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter new email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label style={labelStyling}>New Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Enter new password (optional)"
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                id="showPasswordToggle" // Unique ID
                label="Show Password"
                onChange={() => setShowPassword(!showPassword)}
                style={{ color: PRIMARY_COLOR, marginTop: "5px" }}
              />

              {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
              {success && <div style={{ color: "limegreen", marginTop: "10px" }}>{success}</div>}

              <Button type="submit" style={buttonStyling} className="mt-3 w-100">
                Save Changes
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
