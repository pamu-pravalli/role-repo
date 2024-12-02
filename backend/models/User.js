const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  status: { type: String, default: 'Active' },
});

module.exports = mongoose.model('User', userSchema);
