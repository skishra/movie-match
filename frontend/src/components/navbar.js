import { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // To react to route changes

  // Update user state when location or token changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const fetchedUser = getUserInfo();
      setUser(fetchedUser);
    } else {
      setUser(null);
    }
  }, [location]); // Runs every time route changes

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <ReactNavbar bg="#3a0d0d" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/MovieSearch" style={{ color: "white" }}>
            Movie Search
          </Nav.Link>
          <Nav.Link as={Link} to="/favoriteMovie" style={{ color: "white" }}>
            Favorite Movie
          </Nav.Link>
        </Nav>

        {user ? (
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src={
                user.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
                border: "2px solid white",
              }}
            />
            <span style={{ color: "white", fontWeight: "bold" }}>
              {user.username || "User"}
            </span>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginLeft: "10px",
                  color: "white",
                  fontWeight: "bold",
                }}
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/favoriteMovie")}>
                  Favorites
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Guest"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
                border: "2px solid white",
              }}
            />
            <span style={{ color: "white", fontWeight: "bold" }}>Guest</span>
            <Nav.Link
              as={Link}
              to="/login"
              style={{
                backgroundColor: "#b2310b",
                color: "white",
                padding: "10px 20px",
                borderRadius: "25px",
                fontWeight: "bold",
                border: "2px solid white",
                marginLeft: "10px",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3a0d0d";
                e.target.style.color = "#f4c430";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#b2310b";
                e.target.style.color = "white";
                e.target.style.transform = "scale(1)";
              }}
            >
              Login / Sign Up
            </Nav.Link>
          </div>
        )}
      </Container>
    </ReactNavbar>
  );
}
