import jwt_decode from "jwt-decode";

const getUserInfo = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.warn("No access token found in localStorage.");
    return null; // Return null if no token is found
  }

  try {
    const decodedToken = jwt_decode(accessToken); // Decode the JWT token
    return decodedToken; // Return the decoded user information
  } catch (error) {
    console.error("Failed to decode JWT:", error.message);
    return null; // Return null if decoding fails
  }
};

export default getUserInfo;