const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recordRoutes = require('./routes/records');
const connectDB = require('./db');


const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use('/records', recordRoutes);


app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
