const express  = require("express")
const app      = express()
const router    = express.Router()
const mongoose  = require("mongoose")

mongoose.set('useFindAndModify', false);

//models
const Blog     = require("../models/Blog")

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err)
        } else {
            console.log(blogs)
            res.render("blogs", {blogs: blogs});
        }
    });
});

router.get("/blogs/new", isMember, (req, res) => {
        if(req.user._id.equals("5e316a84debc702af83b8510")) {
            res.render("new")
        } else {
            res.send("admin autherisation required")
        }

});

//create blog post
router.post("/blogs", isMember, (req, res) => {
    if(req.user._id.equals("5e316a84debc702af83b8510")) {
const date = new Date()

const month = date.getMonth(),
      day   = date.getDate(),
      year  = date.getFullYear()

      function convertMonthNum(monthNum) {
          let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"  ]
          return months[monthNum]
      }
    
    let blog = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        date: `${convertMonthNum(month)} ${day}, ${year}`
    }

    if(blog.content) {
        blog.content = req.sanitize(req.body.content);
        blog.title = req.sanitize(req.body.title);
        blog.image = req.sanitize(req.body.image);


        Blog.create(blog,  (err, blogs) => {
            if(err){
                console.log(err)
            } else {
                res.redirect("/blogs")
                }
            });
    } else {
        res.redirect("blogs/new")
    }

} else {
    res.send("admin authorisation required")
}
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
    if(req.user._id.equals("5e316a84debc702af83b8510")) {
    Blog.findById(req.params.id, (err, blogEdit) => {
        if(err){
            console.log(err);
            res.redirect("/blogs"); 
        } else {
            res.render("edit", {blog: blogEdit});
        }
    });

    } else {
        res.send("admin authorisation required")
    }
});


router.put("/blogs/:id", isMember, (req, res) => {
    if(req.user._id.equals("5e316a84debc702af83b8510")) {
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
    } else {
        res.send("admin authorisation required")
    }
});

router.delete("/blogs/:id", isMember, (req, res) => {
    if(req.user._id.equals("5e316a84debc702af83b8510")) {
    Blog.findOneAndDelete(req.params.id, req.body.blog, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
} else {
    res.send("admin authorisation required")
}
})

function isMember(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = router