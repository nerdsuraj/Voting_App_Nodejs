const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const dotenv = require("dotenv");
const app = express();

dotenv.config();
var IndexRouter = require('./router/index');
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));


app.use(cors());

app.use(helmet(
    {
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginEmbedderPolicy: false,

    }
));

app.use("/api", IndexRouter);

app.use('/', (req, res) => {
    res.send('Hello World');
});


let opts = {
    useNewUrlParser: true,
    // keepAlive: true,
    // bufferMaxEntries: 0,
    connectTimeoutMS: 45000,
    socketTimeoutMS: 60000,
    family: 4,
    useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_URL, opts)
  .then(() => {
    console.log("connected to db =>", process.env.DB_URL);
  })
  .catch((err) => {
    console.log("🚀 ~ file: index.js:35 ~ mongoose.connect ~ err", err);
    return {};
  });

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});