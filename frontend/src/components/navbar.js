import { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ReactNavbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null); // Track logged-in user
  const navigate = useNavigate();

  // Fetch user info on component mount
  useEffect(() => {
    const fetchedUser = getUserInfo();
    setUser(fetchedUser); // Set user state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null); // Reset user state
    navigate("/login");
  };

  return (
    <ReactNavbar
      bg="dark"
      variant="dark"
      style={{
        backgroundColor: "#3a0d0d", // Match MovieMatch background
        borderBottom: "2px solid #b2310b", // Optional: Add a border for styling
      }}
    >
      <Container>
        {/* Left-side nav links */}
        <Nav className="me-auto">
          <Nav.Link href="/MovieMatch" style={{ color: "white" }}>
            Movie Match
          </Nav.Link>
          <Nav.Link href="/favoriteMovie" style={{ color: "white" }}>
            Favorite Movie
          </Nav.Link>
        </Nav>

        {/* Right-side: Profile or Login */}
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
              {user.username || "User"} {/* Display username */}
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
              >
                ▼
              </Dropdown.Toggle>
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
              href="/login"
              style={{
                backgroundColor: "#b2310b", // Match the MovieMatch color scheme
                color: "white",
                padding: "10px 20px",
                borderRadius: "25px",
                fontWeight: "bold",
                border: "2px solid white",
                marginLeft: "10px",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3a0d0d"; // Darker hover effect
                e.target.style.color = "#f4c430"; // Add a golden hover text color
                e.target.style.transform = "scale(1.05)"; // Slightly enlarge on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#b2310b"; // Reset background color
                e.target.style.color = "white"; // Reset text color
                e.target.style.transform = "scale(1)"; // Reset size
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