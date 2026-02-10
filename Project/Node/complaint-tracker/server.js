import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let complaints = [];
let idCounter = 1;

app.get("/complaints", (req, res) => {
  res.json(complaints);
});

app.get("/complaints/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  res.json(complaint);
});

app.post("/complaints", (req, res) => {
  const { fullname, email, phone, title, description } = req.body;

  if (!fullname || !email || !phone || !title || !description) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newComplaint = {
    id: idCounter++,
    fullname,
    email,
    phone,
    title,
    description,
    status: "pending"
  };

  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});

app.put("/complaints/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = status;
  res.json(complaint);
});

app.delete("/complaints/:id", (req, res) => {
  const id = parseInt(req.params.id);
  complaints = complaints.filter(c => c.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});