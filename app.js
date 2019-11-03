var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
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
    //stops users from entering javascript from the forms
    //It has to be after body parser
app.use(expressSanitizer())
    //This allows us to do the edit and delete method from the forms
    //It looks for "_method" in the query and changes to method to whatever it is = to 
app.use(methodOverride("_method"))


//Connects to mongodb ... currently connects locally
mongoose.connect("mongodb://localhost:27017/club", { useNewUrlParser: true, useUnifiedTopology: true });

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
        //removes the script from position... not useful now but it will later
    req.body.member.position = req.sanitize(req.body.member.body)
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

//Edit
app.get("/members/:id/edit", function(req, res){
    Member.findById(req.params.id, function(err, foundMember){
        if(err){
            console.log("Could not find the member to edit");
            res.redirect("/members")
        }else{
            res.render("edit", {member: foundMember})
        }
    })
})

//Update Route
app.put("/members/:id", function(req, res){
    //Member.findByIdAndUpdate(ID to find, new DataCue, callback)
    Member.findByIdAndUpdate(req.params.id, req.body.member, function(err, updatedMember){
        if(err){
            console.log("Could not update member");
            res.redirect("/members")
        }else{
            res.redirect("/members/" + req.params.id)
        }
    })
})

//DESTROYER!
app.delete("/members/:id", function(req, res){
    Member.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Could not delete member");
            res.redirect("/members");
        }
        else{
            res.redirect("/members");
        }
    })
})


app.listen(port, function(){
    console.log("YO! Servers up at port " + port + " DAWG!")
})