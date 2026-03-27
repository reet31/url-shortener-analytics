const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

const shortenRoute = require('./Routes/shortenroute');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

app.use('/', shortenRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});