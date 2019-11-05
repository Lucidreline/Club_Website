var express = require("express");
var router = express.Router();

//This is requiring the schema for a member
var Member = require("../models/member");

//Members route
router.get("/members", function(req, res){
    Member.find({}, function(err, members){
        if(err){
            console.log("Error finding all members on getting /members")
        }else{
            res.render("members/index", {members: members})
        }
    });
})

//New Member route
router.get("/members/new", isLoggedIn, function(req, res){
    res.render("members/new");
})

//Create Member route
router.post("/members", isLoggedIn, function(req, res){
    //create member
        //removes the script from position... not useful now but it will later
    req.body.member.position = req.sanitize(req.body.member.body)
    Member.create(req.body.member, function(err, newMember){
        if(err){
            res.render("members/new")
            console.log("Error creating the member");
        }else{
            //redirect
            res.redirect("/members");
        }
    })
})

//Show - Zooms into a spesific option and showcases the details
router.get("/members/:id", function(req, res){
    Member.findById(req.params.id, function(err, foundMember){
        if(err){
            console.log("Coudn't find member");
            res.redirect("/members")
        }else{
            res.render("members/show", {member: foundMember, currentAdmin: req.user});
        }
    })
})

//Edit
router.get("/members/:id/edit", isLoggedIn, function(req, res){
    Member.findById(req.params.id, function(err, foundMember){
        if(err){
            console.log("Could not find the member to edit");
            res.redirect("/members")
        }else{
            res.render("members/edit", {member: foundMember})
        }
    })
})

//Update Route
router.put("/members/:id", isLoggedIn, function(req, res){
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
router.delete("/members/:id", isLoggedIn, function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/admin/login");
    }
}

module.exports = router;