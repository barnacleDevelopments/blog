var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express(),
    expressSanitizer = require("express-sanitizer")
    
    var methodOverride = require("method-override")


    
    app.use(methodOverride("_method"));
    mongoose.connect("mongodb://localhost/first_blog", {useUnifiedTopology: true, useNewUrlParser: true});
    app.use(expressSanitizer());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    
    var blogSchema = new mongoose.Schema({
        title: String,
        image: String,
        content: String,
        date: {type: Date, default: Date.now}
    });
    
    var Blog = mongoose.model("Blog", blogSchema);


    app.get("/", (req, res) => {
        res.render("index")
    });

    //get all the blogs
    app.get("/blogs", (req, res) => {
        Blog.find({}, (err, blogs) => {
            if(err){
                console.log(err)
            } else {
                res.render("blogs", {blogs: blogs});
            }
        });
    });

    app.get("/blogs/new", (req, res) => {
        res.render("new")
    });

    //create blog post
    app.post("/blogs", (req, res) => {
        req.body.blog.content = req.sanitize(req.body.blog.content);
        var blogPost = req.body.blog;
            Blog.create(blogPost, (err, blogs) => {
                if(err){
                    res.render("new")
                } else {
                    console.log(blogs)
                    res.redirect("/blogs")
                }
            });
    });

    //show a focused view of a single sellected blog post
    app.get("/blogs/:id", (req, res) => {
        Blog.findById(req.params.id, (err, singleBlog) => {
            if(err) {
                res.redirect("/blogs")
            } else {
                res.render("show", {blog: singleBlog});
            }
        });
    });

    //render edit page 
    app.get("/blogs/:id/edit", (req, res) => {
        Blog.findById(req.params.id, (err, blogEdit) => {
            if(err){
                console.log(err);
                res.redirect("/blogs"); 
            } else {
                res.render("edit", {blog: blogEdit});
            }
        });
    });
    

    app.put("/blogs/:id", (req, res) => {
         Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
              if(err) {
                  console.log(err)
             } else {
                 res.redirect("/blogs/" + updatedBlog._id)
             }
        });
    });

    app.delete("/blogs/:id", (req, res) => {
        Blog.findOneAndDelete(req.params.id, req.body.blog, (err) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect("/blogs");
            }
        })
    })

    app.listen(3000, () => {
        console.log("Blog started!")        
    })

    

