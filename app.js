var bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express(),
    expressSanitizer = require("express-sanitizer"),
    helmet           = require("helmet"),
    session          = require("express-session"),
    passport         = require("passport"),
    methodOverride   = require("method-override"),
    LocalStrategy    = require("passport-local")

//models
const User = require("./models/User")

//routes
const blogRoutes = require("./routes/blog-routes"),
      authRoutes = require("./routes/auth-routes")

    
    app.use(helmet({dnsPrefetchControl: {allow: true}}))
    app.use(methodOverride("_method"));
    app.use(expressSanitizer());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");

    process.env.DATABASE="mongodb+srv://firstdb:WEh7wlm9iNfqTLxM@cluster0-1t4lu.mongodb.net/test?retryWrites=true&w=majority"
    process.env.SESSION_SECRET="GrapesFallFromBranches"

    mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true } )
    .then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log(err)
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
      
      app.use(function(req, res, next) {
            res.locals.currentUser = req.user
            next()
      })

      app.use(blogRoutes)
      app.use(authRoutes)

    
    //get all the blogs

    app.listen(3000, () => {
        console.log("Blog started!")        
    })

    

