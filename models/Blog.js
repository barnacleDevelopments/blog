const mongoose = require("mongoose")

var blogSchema = new mongoose.Schema({
     title: String,
     image: String,
     content: String,
     date: String

 });
 
 var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog