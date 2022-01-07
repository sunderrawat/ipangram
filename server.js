const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.port || 3000;
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connect successfully');
  })
  .catch(() => {
    console.log('DB connection fail');
  });

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
  console.log(`app is now started on port ${port}`);
});
