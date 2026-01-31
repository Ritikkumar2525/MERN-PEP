import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const FILE_PATH = path.join(__dirname, "students.json");

// Ensure file exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "[]");
}

const readStudents = () => {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

const writeStudents = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};



app.post("/students", (req, res) => {
  const { name, email, course } = req.body || {};

  if (!name || !email || !course) {
    return res.status(400).json({ message: "All fields (name, email, course) are required" });
  }

  const students = readStudents();

  const newStudent = {
    id: Date.now(),
    name,
    email,
    course,
  };

  students.push(newStudent);
  writeStudents(students);

  res.status(201).json(newStudent);
});



app.get("/students", (req, res) => {
  const students = readStudents();
  res.json(students);
});



app.get("/students/:id", (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});



app.put("/students/:id", (req, res) => {
  const { name, email, course } = req.body;
  const students = readStudents();

  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = {
    ...students[index],
    name,
    email,
    course,
  };

  writeStudents(students);
  res.json(students[index]);
});



app.delete("/students/:id", (req, res) => {
  let students = readStudents();

  const filtered = students.filter(s => s.id != req.params.id);

  if (students.length === filtered.length) {
    return res.status(404).json({ message: "Student not found" });
  }

  writeStudents(filtered);
  res.json({ message: "Student deleted successfully" });
});



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});