const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Alumni = require('../models/Alumni');

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Create alumni
router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.profileImage = `/uploads/${req.file.filename}`; // ✅ fixed string
    // data.addedBy = req.user._id; // ❌ removed for now (no user middleware)
    const alumni = new Alumni(data);
    await alumni.save();
    res.status(201).json(alumni);
  } catch (err) {
    console.error('Error saving alumni:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all alumni
router.get('/', async (req, res) => {
  try {
    const list = await Alumni.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const item = await Alumni.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update
router.put('/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.profileImage = `/uploads/${req.file.filename}`;
    const updated = await Alumni.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
