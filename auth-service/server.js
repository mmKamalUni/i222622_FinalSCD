const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];
const SECRET = "exam_secret";

const registerHandler = (req, res) => {
  const { email, password, role } = req.body;
  users.push({ email, password, role });
  res.json({ message: "User registered" });
};

const loginHandler = (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
};

app.post("/register", registerHandler);
app.post("/login", loginHandler);

// support routes when gateway forwards /auth/* (gateway preserves original path)
app.post("/auth/register", registerHandler);
app.post("/auth/login", loginHandler);

app.get("/health", (_, res) => res.send("Auth OK"));

app.listen(4001, () => console.log("Auth Service on 4001"));
