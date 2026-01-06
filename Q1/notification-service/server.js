const express = require("express");
const app = express();

app.use(express.json());

app.post("/notify", (req, res) => {
  console.log("Notification:", req.body.message);
  res.json({ status: "sent" });
});

app.get("/health", (_, res) => res.send("Notification OK"));

app.listen(4005, () => console.log("Notification Service on 4005"));
