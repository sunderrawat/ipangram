const path = require('path');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const authController = require('./controller/authController');
const app = express();
app.use(cors());
//for body parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'success',
//     data: {
//       text: 'hello from nodejs ',
//     },
//   });
// });

app.use('/api/v1/users', userRouter);
app.use('/api/v1', authController.protect);
app.use('/api/v1/projects', authController.protect, projectRouter);

// app.all('*', (req, res) => {
//   res.status(404).json({
//     status: 'fail',
//     message: 'this route is not created',
//   });
// });

// serve frontend
app.use(express.static(__dirname + '/frontend/build'));

module.exports = app;
