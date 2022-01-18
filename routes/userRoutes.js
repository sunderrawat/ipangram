const express = require('express');

const authController = require('./../controller/authController');

const {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require('../controller/userController');
const router = express.Router();

router.post('/signup', authController.signUpUser);

router.post('/login', authController.loginUser);

//only allow these all routes for admin and special
router
  .route('/')
  .get(
    authController.protect,
    authController.accessTo('mentor', 'admin'),
    getAllUsers
  )
  .delete(
    authController.protect,
    authController.accessTo('admin'),
    deleteAllUsers
  );

router
  .route('/:id')
  .get(authController.protect, authController.accessTo('admin'), getUserById)
  .delete(
    authController.protect,
    authController.accessTo('admin'),
    deleteUserById
  )
  .patch(
    authController.protect,
    authController.accessTo('admin'),
    updateUserById
  );

module.exports = router;
