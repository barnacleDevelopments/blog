const mongoose = require("mongoose")

const date = new Date

var blogSchema = new mongoose.Schema({
     title: String,
     image: String,
     content: String,

 });
 
 var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog