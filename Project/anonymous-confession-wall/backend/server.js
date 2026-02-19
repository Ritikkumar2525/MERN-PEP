import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import "./config/passport.js";
import confessionRoutes from "./routes/confessionRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5500",
  credentials: true
}));


app.use(express.json());

app.set("trust proxy", 1);

app.use(session({
  secret: "luxurySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.use("/confessions", confessionRoutes);

app.get("/test", (req, res) => {
  res.send("Test route working");
});


app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:5500/Project/anonymous-confession-wall/frontend/index.html"
    }),
    (req, res) => {
      res.redirect("http://localhost:5500/Project/anonymous-confession-wall/frontend/index.html");
    }
  );

app.get("/auth/user", (req, res) => {
  res.json(req.user || null);
});

app.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:5500/Project/anonymous-confession-wall/frontend/index.html");
    });
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});