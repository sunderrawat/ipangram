const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'minimun 3 characters'],
    maxlength: [40, 'maximum 40 characters required'],
    required: true,
  },
  password: {
    type: String,
    minlength: [5, 'minimum 5 characters'],
    maxlength: [30, 'maximum 30 characters'],
    required: [true, 'password is a required field'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: [5, 'minimum 5 characters'],
    maxlength: [30, 'maximum 30 characters'],
    required: [true, 'password confirm is required fields'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'confirmPassword must be same as password',
    },
    select: false,
  },
  email: {
    type: String,
    minlength: [4, 'email is invalid'],
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ['employee', 'mentor', 'admin'],
      message: 'role is user or admin',
    },
    default: 'employee',
  },
  token: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
