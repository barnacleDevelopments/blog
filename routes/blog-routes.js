const express  = require("express")
const app      = express()
const router    = express.Router()
const mongoose = require("mongoose")
const expressSanitizer = require("express-sanitizer")
const bodyParser   = require("body-parser");
var helmet           = require("helmet"),
    session          = require("express-session"),
    passport         = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

//models
const Blog     = require("../models/Blog")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());


function isMember(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

router.get("/blogs", (req, res) => {
    const user = req.user
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err)
        } else {
            res.render("blogs", {blogs: blogs, currentUser: user});
        }
    });
});

router.get("/blogs/new", isMember, (req, res) => {
    res.render("new")
});

//create blog post
router.post("/blogs", isMember, (req, res) => {
    let blog = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    }
    req.body.content = req.sanitize(blog);

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

module.exports = router