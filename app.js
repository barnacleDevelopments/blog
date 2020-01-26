//depencies 
var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express(),
    expressSanitizer = require("express-sanitizer")
    
//models 
const blogRoute = require("./routes/blog-routes")
app.use("/", blogRoute)

    mongoose.set('useFindAndModify', false);
    var methodOverride = require("method-override")

    app.use(methodOverride("_method"));
    mongoose.connect("mongodb://localhost/first_blog", {useUnifiedTopology: true, useNewUrlParser: true});
    app.use(expressSanitizer());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");

    app.get("/", (req, res) => {
        res.redirect("/blogs")
    });

    //get all the blogs


    app.listen(3000, () => {
        console.log("Blog started!")        
    })

    

