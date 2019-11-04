var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    port = 8080;

var announcementRoutes = require("./routes/announcements"),
    memberRoutes = require("./routes/members"),
    pagesRoutes = require("./routes/mainPages");


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

//Uses the routes aka the refactored restful routes
app.use(memberRoutes);
app.use(announcementRoutes);
app.use(pagesRoutes);

//Connects to mongodb ... currently connects locally
mongoose.connect("mongodb://localhost:27017/club", { useNewUrlParser: true, useUnifiedTopology: true });


app.get("/", function(req, res){
    res.redirect("/home");
})



app.listen(port, function(){
    console.log("YO! Servers up at port " + port + " DAWG!")
})