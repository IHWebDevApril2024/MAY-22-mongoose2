const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  username: { type: String, unique: true, trim: true, required: true },
  age: { type: Number, required: true },
  role: { type: String, default: "Minion" },
  bootcamp: { type: String, enum: ["UX - UI", "Web Dev", "Data"] },
  hasCampusKey: { type: Boolean, default: false },
  hobbies: [String],
  projects: Array,
});

// After we create the schema we are going to create a model to CRUD our students
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

/*
{
  "_id": {
    "$oid": "664c5890d2a61f75235b3f1c"
  },
  "username": "John",
  "role": "Developer",
  "bootcamp": "Web Development",
  "age": 28,
  "hasCampusKey": true,
  "hobbies": [
    "cycling",
    "gaming",
    "dogs",
    "coffee"
  ],
  "projects": [
    "Ironhack project 2",
    "WebApp 3000"
  ]
}

*/
