import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#f4c430";
const SECONDARY_COLOR = "#3a0d0d";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Light Mode");
  const navigate = useNavigate();

  useEffect(() => {
    const obj = getUserInfo();
    setUser(obj);

    if (light) {
      setBgColor("white");
      setBgText("Dark Mode");
    } else {
      setBgColor(SECONDARY_COLOR);
      setBgText("Light Mode");
    }
  }, [light]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      setError("");
      navigate("/MovieMatch");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (user) {
    navigate("/MovieMatch");
    return null;
  }

  return (
    <section
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: light ? "#f8f9fa" : "#1e1e1e",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: PRIMARY_COLOR, fontWeight: "bold" }}
        >
          Welcome Back 🎬
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label style={{ color: PRIMARY_COLOR }}>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={data.username}
              onChange={handleChange}
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label style={{ color: PRIMARY_COLOR }}>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={data.password}
              onChange={handleChange}
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <div className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={bgText}
              onChange={() => setLight(!light)}
              style={{ color: light ? "#000" : "#ccc" }}
            />
          </div>

          {error && (
            <div className="text-danger text-center mb-3" style={{ fontWeight: "bold" }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: PRIMARY_COLOR,
              border: "none",
              color: bgColor,
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Log In
          </Button>
        </Form>

        <p className="text-center mt-4" style={{ color: light ? "#000" : "#ccc" }}>
          Don’t have an account?
          <Link to="/signup" style={{ color: PRIMARY_COLOR, marginLeft: "5px" }}>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
