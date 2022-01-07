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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email, password });
  res.status(200).json({
    status: 'success',
    message: 'user login success',
  });
});

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        status: 'success',
        message: 'all user data',
        users,
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        err,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      await User.deleteMany();
      res.status(204).json({
        status: 'success',
        message: 'all user deleted',
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        err,
      });
    }
  });
module.exports = router;
