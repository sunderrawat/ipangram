const express = require('express');
const userRouter = require('./routes/userRoutes');

const app = express();
//for body parsing data
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      text: 'hello from nodejs ',
    },
  });
});

app.use('/api/v1/users', userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'this route is not created',
  });
});

module.exports = app;