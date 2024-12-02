const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

// Get All Roles
router.get('/', async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

// Add a Role
router.post('/', async (req, res) => {
  const newRole = new Role(req.body);
  await newRole.save();
  res.json(newRole);
});

// Update a Role
router.put('/:id', async (req, res) => {
  const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedRole);
});

// Delete a Role
router.delete('/:id', async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
