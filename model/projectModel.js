const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'project must have a name'],
  },
  startDate: {
    type: Date,
    required: [true, 'project must have a date'],
  },
  description: {
    type: String,
    required: [true, 'project must have an description'],
    trim: true,
  },
  endDate: {
    type: Date,
    required: [true, 'project must have an end date'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'project must assign to a developer or other member'],
    },
  ],
  document: String,
  approved: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
