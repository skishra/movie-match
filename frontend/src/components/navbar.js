import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/MovieMatch">Movie Match</Nav.Link>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav>
        {user ? (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              style={{
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <img
                src={user.profilePicture || "https://via.placeholder.com/40"} // Replace with user's profile picture URL
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/profile")}>
                Profile Setting
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/privateUserProfile")}>
                My Favorite
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Nav.Link href="/login">Login / Sign Up</Nav.Link>
        )}
      </Container>
    </ReactNavbar>
  );
}