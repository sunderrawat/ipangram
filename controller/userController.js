const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
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
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
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
};

exports.getUserById = async (req, res) => {
  try {
    const user = await findById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'user data successfully fetched',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'user successfully deleted by admin',
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: 'success',
      message: 'something went wrong!',
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'user successfully updated by admin',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'success',
      message: 'something went wrong!',
    });
  }
};
