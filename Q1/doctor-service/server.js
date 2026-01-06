const express = require("express");
const app = express();

app.use(express.json());

let doctors = [
  { id: 1, name: "Dr. Ahmed", specialization: "Cardiology", available: true },
  { id: 2, name: "Dr. Khan", specialization: "Dermatology", available: false }
];

app.get("/doctors", (req, res) => res.json(doctors));

app.put("/doctors/:id/availability", (req, res) => {
  const doc = doctors.find(d => d.id == req.params.id);
  doc.available = req.body.available;
  res.json({ message: "Availability updated" });
});

app.get("/health", (_, res) => res.send("Doctor OK"));

app.listen(4003, () => console.log("Doctor Service on 4003"));
