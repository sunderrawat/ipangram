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
          project,
          message: 'project successfully created',
        },
      });
    } catch (err) {
      console.log(err.code);
      if (err.code === 11000) {
        return res.status(400).json({
          status: 'fail',
          message: err.message || 'project creation failed',
        });
      }
      res.status(500).json({
        status: 'fail',
        message: 'project creation failed',
      });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(400).json({
          status: 'fail',
          message: 'no project found with this id',
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          project,
        },
      });
    } catch (err) {
      console.log(err);
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).json({
          status: 'fail',
          message: `invalid id ${err.message}`,
        });
      }
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        err,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'project updated successfully',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong!',
      });
    }
  })
  .delete(async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        message: 'project deleted success',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong!',
      });
    }
  });

module.exports = router;
