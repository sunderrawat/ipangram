const express = require("express");
const userRouter = require('./routes/userRoutes');

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
    data: {
      text: "hello from nodejs ",
    },
  });
});

app.use('/api/v1/users', userRouter);

module.exports = app;
