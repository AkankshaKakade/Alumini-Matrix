const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: String,
  degree: String,
  email: String,
  phone: String,
  company: String,
  designation: String,
  linkedin: String,
  profileImage: String, // stores path like /uploads/159123123.jpg
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', AlumniSchema);