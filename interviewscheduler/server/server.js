import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";

// Routes
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import authRoutes from "./routes/passport-config-oauth.js";

// Passport strategies
import "./routes/passport-config.js"; // Local strategy

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/", authRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://Prakash45:prakash4533@sih.faidhae.mongodb.net/?retryWrites=true&w=majority&appName=SIH', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
