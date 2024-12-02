const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get All Users
router.get('/', async (req, res) => {
  const users = await User.find().populate('role');
  res.json(users);
});

// Add a User
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Update a User
router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// Delete a User
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
