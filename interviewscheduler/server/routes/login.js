// server/routes/login.js
import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("Login attempt:", { err, user, info });

    // Server/database error
    if (err) {
      console.error("Server error during login:", err);
      return res.status(500).json({ success: false, message: err.message });
    }

    // Invalid credentials
    if (!user) {
      console.log("Login failed:", info);
      return res.status(401).json({ success: false, message: info?.message || "Invalid email or password" });
    }

    // Log in the user and create session
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during req.logIn:", err);
        return res.status(500).json({ success: false, message: err.message });
      }

      console.log("Login successful for user:", user.email);

      // Send user info to frontend
      return res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
        },
      });
    });
  })(req, res, next);
});

export default router;
