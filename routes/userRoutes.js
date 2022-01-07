const express = require('express');
const User = require('./../model/userModel');

const router = express.Router();

router.post('/signup', (req, res) => {
  res.status(201).json({
    message: 'user created successfully',
  });
});

module.exports = router;
