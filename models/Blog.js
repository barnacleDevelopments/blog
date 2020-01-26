   const mongoose = require("mongoose")

   const date = new Date

   const currentDate = date.getMonth()

   console.log(currentDate)

   var blogSchema = new mongoose.Schema({
        title: String,
        image: String,
        content: String,
        date: currentDate
    });
    
    var Blog = mongoose.model("Blog", blogSchema);

   module.exports = Blog