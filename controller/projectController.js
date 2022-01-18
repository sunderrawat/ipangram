const path = require('path');
const Project = require('./../model/projectModel');
const multer = require('multer');
let documents = [];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/projects/documents'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split('/')[1];
    const filename = `${
      file.fieldname + req.user._id + '-' + uniqueSuffix
    }.${extension}`;
    if(file.fieldname==='documents'){
        documents.push(filename);
    }
    if(file.fieldname==='featureImage'){
        req.body.featureImage = filename;
    }
    req.body.documents = documents;
    cb(null, filename);
  },
});

const upload = multer({ storage });

exports.uploadProjectDocs = upload.fields([
  { name: 'featureImage', maxCount: 1 },
  { name: 'documents', maxCount: 10 },
]);

exports.getProjects = async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'employee') {
      projects = await Project.find({ members: { $in: req.user._id } });
    } else if (req.user.role === 'mentor') {
      projects = await Project.find({ mentor: req.user._id });
    } else if (req.user.role === 'admin') {
      projects = await Project.find();
    }
    res.status(200).json({
      status: 'success',
      data: {
        results: projects.length,
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
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      mentor: req.user._id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        project,
        message: 'project successfully created',
      },
    });
  } catch (err) {
    console.log(err);
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
};

exports.getProjectById = async (req, res) => {
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
};

exports.updateProjectById = async (req, res) => {
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
};

exports.deleteProjectById = async (req, res) => {
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
};

exports.updateDocs = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: 'success',
      data: {
        message: 'project files successfully uploaded',
      },
    });
  } catch (err) {
    console.log(err);
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
};