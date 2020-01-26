//depencies 
const bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express(),
    expressSanitizer = require("express-sanitizer"),
    passport         = require("passport"),
    session          = require("express-session"),
    LocalStrategy = require('passport-local').Strategy
    
//models 
const blogRoute = require("./routes/blog-routes")
const authRoutes = require("./routes/index")
app.use("/", blogRoute)
app.use("/", authRoutes)

mongoose.set('useFindAndModify', false);
var methodOverride = require("method-override")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/first_blog", {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log("connection sucessful"))
.catch((err) => console.error(err))

app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//user authentication setup 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

const User = require("./models/User")
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

    app.get("/", (req, res) => {
        res.redirect("/blogs")
    });

    //get all the blogs


    app.listen(3000, () => {
        console.log("Blog started!")        
    })

    

