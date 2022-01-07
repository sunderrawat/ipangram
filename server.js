const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.port || 8000;
const DB = process.env.DB;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log('DB connect successfully');
  })
  .catch(() => {
    console.log('DB connection fail');
  });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`app is now started on port ${port}`);
});
