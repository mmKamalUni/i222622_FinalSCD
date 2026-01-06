const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Ali", age: 25 },
  { id: 2, name: "Sara", age: 30 }
];

app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
  users.push(req.body);
  res.json({ message: "User added" });
});

app.get("/health", (_, res) => res.send("User OK"));

app.listen(4002, () => console.log("User Service on 4002"));
