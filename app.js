var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    port = 8080;

//app config
    //Tells the app to render ejs files so i dont need to add the .ejs extension every time
app.set("view engine", "ejs");
    //Tells the app where to find the stylesheets folder
app.use(express.static("public"));
    //I believe this is for when we take in info from a form
app.use(bodyParser.urlencoded({extended:true}));

//Connects to mongodb ... currently connects locally
mongoose.connect("mongodb://localhost:27017/club", { useNewUrlParser: true });

//Mongoose model
var MemberSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    position: String
});
var Member = mongoose.model("Member", MemberSchema);

app.get("/", function(req, res){
    res.redirect("/members");
})

//Restfull routes - - - - - -
//Members route
app.get("/members", function(req, res){
    Member.find({}, function(err, members){
        if(err){
            console.log("Error finding all members on getting /members")
        }else{
            res.render("index", {members: members})
        }
    });
})

//New Member route
app.get("/members/new", function(req, res){
    res.render("new");
})

//Create Member route
app.post("/members", function(req, res){
    //create member
    Member.create(req.body.member, function(err, newMember){
        if(err){
            res.render("new")
            console.log("Error creating the member");
        }else{
            //redirect
            res.redirect("/members");
        }
    })
})

//Show - Zooms into a spesific option and showcases the details
app.get("/members/:id", function(req, res){
    Member.findById(req.params.id, function(err, foundMember){
        if(err){
            console.log("Coudn't find member");
            res.redirect("/members")
        }else{
            res.render("show", {member: foundMember});
        }
    })
})


app.listen(port, function(){
    console.log("Servers up at port " + port)
})