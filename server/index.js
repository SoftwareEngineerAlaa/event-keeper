"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const mongoose = require("./model");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is listening to Port ${port}`);
});
