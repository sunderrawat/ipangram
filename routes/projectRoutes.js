const express = require('express');
const authController = require('./../controller/authController');
const {
  uploadProjectDocs,
  getProjects,
  createProject,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  updateDocs,
} = require('./../controller/projectController');

const router = express.Router();

router
  .route('/')
  .get(getProjects)
  .post(authController.accessTo('admin', 'mentor'), createProject);

router
  .route('/:id')
  .get(getProjectById)
  .patch(updateProjectById)
  .delete(deleteProjectById);

//upload files to project
router
  .route('/:id/upload')
  .patch(
    authController.accessTo('admin', 'mentor'),
    uploadProjectDocs,
    updateDocs
  );

module.exports = router;
