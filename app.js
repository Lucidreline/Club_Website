var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    port = 8080;

var passportLocalMongoose = require("passport-local-mongoose"),
    localStrategy = require("passport-local"),
    passport = require("passport")
    require("dotenv").config();
    

var announcementRoutes = require("./routes/announcements"),
    memberRoutes = require("./routes/members"),
    pagesRoutes = require("./routes/mainPages"),
    adminRoutes = require("./routes/admin");

//Connects to mongodb ... currently connects locally
mongoose.connect("mongodb://localhost:27017/club", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false

}))

//app config
    //Tells the app to render ejs files so i dont need to add the .ejs extension every time
app.set("view engine", "ejs");
    //Tells the app where to find the stylesheets folder
app.use(express.static("public"));
    //I believe this is for when we take in info from a form
app.use(bodyParser.urlencoded({extended:true}));
    //stops users from entering javascript from the forms
    //It has to be after body parser
app.use(expressSanitizer())
    //This allows us to do the edit and delete method from the forms
    //It looks for "_method" in the query and changes to method to whatever it is = to 
app.use(methodOverride("_method"))

//Gives my app passport which is auth: passwords
app.use(passport.initialize());
app.use(passport.session())

//REFACTOR ****************

var Admin = require("./models/admin");
//************ */
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

//Uses the routes aka the refactored restful routes
app.use(memberRoutes);
app.use(announcementRoutes);
app.use(pagesRoutes);
app.use(adminRoutes);


//REFACTOR -----------------



//Create a new
app.get("/admin/register", function(req, res){
    res.render("admin/register")
});

//secretPage
app.post("/admin/register", function(req, res){
    req.body.username;
    req.body.password;
    Admin.register(new Admin({username: req.body.username}), req.body.password, function(err, admin){
        if(err){
            console.log("Error registering a new Admin");
            return res.render("admin/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/")
        })
    })
})

app.post("/admin/login", function(req, res){
    
});

// app.post("/admin/register", function(req, res){
     
// });

//REFACTOR -----------





app.get("/", function(req, res){
    res.redirect("/home");
})



app.listen(port, function(){
    console.log("YO! Servers up at port " + port + " DAWG!")
})