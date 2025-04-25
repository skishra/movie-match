const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const newUserModel = require("../models/userModel");
const { generateAccessToken } = require("../utilities/generateToken");

// Using zod for validation
const z = require("zod");

const updateUserSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
});

router.post("/editUser", async (req, res) => {
  try {
    // Validate input
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).send({ message: parsed.error.errors[0].message });
    }

    const { userId, email, password } = parsed.data;

    // Find user by ID
    const existingUser = await newUserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: "User not found." });
    }

    // Prepare updated fields
    const updatedFields = { email };

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password = hashedPassword;
    }

    // Update user
    const updatedUser = await newUserModel.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).send({ message: "Failed to update user." });
    }

    // Generate new token
    const accessToken = generateAccessToken(
      updatedUser._id,
      updatedUser.email,
      updatedUser.username,
      updatedUser.password
    );

    res.header("Authorization", accessToken).send({ accessToken });
  } catch (err) {
    console.error("Error in /editUser:", err);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
