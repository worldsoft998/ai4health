
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  sex: {
    type: String,
    required: true,
   
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);