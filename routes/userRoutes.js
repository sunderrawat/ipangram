const express = require('express');
const User = require('./../model/userModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role || 'employee',
    });
    console.log(req.body);
    console.log(user);
    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'user not created',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
      message: 'user created successfully',
    });
  } catch (err) {
      console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'user not created',
    });
  }
});

router.post('/login', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'user login sccess',
  });
});
module.exports = router;
