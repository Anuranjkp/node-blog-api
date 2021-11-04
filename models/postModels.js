const mongoose = require("mongoose");

const postModels = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorName:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Post", postModels)