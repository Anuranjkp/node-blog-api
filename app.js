var express = require("express");
var app = express();

const authRoutes = require("./routes/auth")
const blogRoutes = require("./routes/blog");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connection = require("./connection");
const cors = require("cors");


connection();





app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next()
})
app.use(bodyParser.json());
app.use(blogRoutes);
app.use(authRoutes)

app.listen(8000, () => {
  console.log("server started !");
});
