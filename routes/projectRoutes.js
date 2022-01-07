const express = require('express');
const Project = require('../model/projectModel');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const projects = await Project.find({});
      res.status(200).json({
        status: 'success',
        data: {
          message: 'All projects loaded ',
          projects,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        satus: 'fail',
        message: 'something went wrong',
      });
    }
  })
  .post(async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          message: 'project successfully created',
        },
      });
    } catch (err) {
      console.log(err);
      res.status(201).json({
        status: 'fail',
        message: 'project creation failed',
      });
    }
  });

  module.exports = router;