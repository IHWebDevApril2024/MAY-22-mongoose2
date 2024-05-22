const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String },
  owners: [{type: mongoose.Schema.Types.ObjectId, ref: "Student"}]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
