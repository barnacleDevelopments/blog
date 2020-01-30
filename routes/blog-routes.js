const express  = require("express")
const app      = express()
const router    = express.Router()

//models
const Blog     = require("../models/Blog")

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/blogs", (req, res) => {
    const user = req.user
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err)
        } else {
            res.render("blogs", {blogs: blogs});
        }
    });
});

router.get("/blogs/new", isMember, (req, res) => {
    res.render("new")
});

//create blog post
router.post("/blogs", isMember, (req, res) => {

const date = new Date()

const month = date.getMonth(),
      day   = date.getDate(),
      year  = date.getFullYear()
    
    let blog = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        date: `${month} ${day}, ${year}`
    }

    blog.content = req.sanitize(req.body.content);
    blog.title = req.sanitize(req.body.title);
    blog.image = req.sanitize(req.body.image);
  

    Blog.create(blog, (err, blogs) => {
        if(err){
            res.render("new")
        } else {
            console.log(blogs)
            res.redirect("/blogs")
            }
        });
});

//show a focused view of a single sellected blog post
router.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, singleBlog) => {
        if(err) {
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: singleBlog});
        }
    });
});

//render edit page 
router.get("/blogs/:id/edit", isMember, (req, res) => {
    Blog.findById(req.params.id, (err, blogEdit) => {
        if(err){
            console.log(err);
            res.redirect("/blogs"); 
        } else {
            res.render("edit", {blog: blogEdit});
        }
    });
});


router.put("/blogs/:id", isMember, (req, res) => {
    let blog = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    }

    blog.content = req.sanitize(req.body.content);
    blog.title = req.sanitize(req.body.title);
    blog.image = req.sanitize(req.body.image);

     Blog.findByIdAndUpdate(req.params.id, blog, (err, updatedBlog) => {
          if(err) {
              console.log(err)
         } else {
             res.redirect("/blogs/" + updatedBlog._id)
         }
    });
});

router.delete("/blogs/:id", isMember, (req, res) => {
    Blog.findOneAndDelete(req.params.id, req.body.blog, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
})

function isMember(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = router