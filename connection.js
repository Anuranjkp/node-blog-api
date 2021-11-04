const mongoose = require("mongoose");

const URI = "mongodb+srv://userDb:userDb@cluster0.o1whx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = async()=>{
    await mongoose.connect(URI)
    console.log("database connected sucessfully")
}


module.exports = connectDB;