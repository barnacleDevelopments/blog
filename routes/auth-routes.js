const express = require("express"),
      router = express.Router(),
      User   = require("../models/User"),
      passport = require("passport")

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
      if(err) {
          res.render("register")
      } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/")
          })
      }
  })
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {

})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/login")
})


module.exports = router