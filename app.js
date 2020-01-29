var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express(),
    expressSanitizer = require("express-sanitizer"),
    helmet           = require("helmet"),
    session          = require("express-session"),
    passport         = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

    app.use(helmet({dnsPrefetchControl: {allow: true}}))
    app.use(methodOverride("_method"));
    app.use(expressSanitizer());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");



    const blogRoutes = require("./routes/blog-routes")
    app.use("/", blogRoutes)
    const User = require("./models/Users")

    
    process.env.SESSION_SECRET="GrapesFallFromBranches"
    process.env.DATABASE="mongodb+srv://firstdb:6KYrct0c3qNZRcZp@cluster0-1t4lu.mongodb.net/test?retryWrites=true&w=majority"

    mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true } )
    .then(() => {
        console.log("connected to database")
    })

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      }));
      
      app.use(passport.initialize());
      app.use(passport.session());

      passport.use(User.createStrategy())

      passport.use(new LocalStrategy(User.authenticate()))

      passport.serializeUser(User.serializeUser())
      passport.deserializeUser(User.deserializeUser())


    //routes 
    app.use(function(req, res, next) {
        res.locals.currentUser = req.user
        next()
    })

    app.get("/", (req, res) => {
        res.render("index")
    });
    
    app.get("/register", (req, res) => {
        res.render("register")
    })
    app.post("/register", (req, res) => {
      User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
          if(err) {
              console.log(err)
              res.render("register")
          } else {
              console.log(user)
              passport.authenticate("local")(req, res, function(){
                res.redirect("/")
              })
          
          }
      })
    })

    app.get("/login", (req, res) => {
        res.render("login")
    })

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res) {

    })

    app.get("/logout", (req, res) => {
        req.logout()
        res.redirect("/login")
    })
    
    function isMember(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect("/login")
    }

    //get all the blogs

    app.listen(3000, () => {
        console.log("Blog started!")        
    })

    

