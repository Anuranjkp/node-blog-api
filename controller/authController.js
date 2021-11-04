var userModel = require("../models/userModels");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken")
const { connect } = require("mongoose");


exports.signUp = async (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  console.log("your account is going to create");

  console.log("retrieving information");
  console.log(req.body);

  var userExist = userModel.findOne({ email: email }).then(async (result) => {
    if (result) {
      return res.status(500).json({
        message: "user already exist",
      });
    } else {
      const passwordHash = await bcrypt.hash(password, 12);

      console.log(passwordHash);

      const user = new userModel({
        fullName: fullName,
        email: email,
        password: passwordHash,
        token: "some token",
      });

      var userData = await user.save();

      res.status(201).json({
        message: "Account created",
        data: userData,
      });
    }
  });
};

exports.signIn = async (req,res,next) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  console.log("started")

  const userEmail = await userModel.findOne({email: loginEmail});

  if(!userEmail){
    res.status(500).json({message: "user not found"})
  }

  
  const userPassword = await bcrypt.compare(loginPassword, userEmail.password);



  if(!userPassword){
    res.status(500).json({message: "incorrect password"})
  }

  const token = jwt.sign({
    email:userEmail,
    userId: userEmail._id.toString(),
  }, 'secret', {expiresIn: '1h'})

  res.status(201).json({
    message: "login sucessfull",
    data: userEmail,
    token: token
  });
  

}
