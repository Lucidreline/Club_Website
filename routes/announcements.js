var express = require("express");
var router = express.Router();

//Find the model
var Announcement = require("../models/announcement");

//gets all of the announcements
router.get("/announcements", function(req, res){
    Announcement.find({}, function(err, foundAnnouncements){
        if(err){
            console.log("Could not find announcements");
            res.redirect("/");
        }else{
            res.render("announcements/index", {announcements: foundAnnouncements});
        }
    })
})

//New announcement route
router.get("/announcements/new", isLoggedIn, function(req, res){
    res.render("announcements/new");
})

//Create a new announcement
router.post("/announcements", isLoggedIn,  function(req, res){
    Announcement.create(req.body.announcement, function(err, newAnnouncement){
        if(err){
            console.log("Could not create Announcement");
            res.redirect("/announcements");
        }else{
            res.redirect("/announcements");
        }
    })
})

//Show page for each announcement
router.get("/announcements/:id", function(req, res){
    Announcement.findById(req.params.id, function(err, foundAnnouncement){
        if(err){
            console.log("Could not find the announcement");
            redirect("/announcements");
        }else{
            res.render("announcements/show", {announcement: foundAnnouncement, currentAdmin: req.user})
        }
    })
})

//Edit an announcement
router.get("/announcements/:id/edit",  isLoggedIn, function(req, res){
    Announcement.findById(req.params.id, function(err, foundAnnouncement){
        if(err){
            console.log("Could not find the announcement to edit");
            res.redirect("/announcements");
        }else{
            res.render("announcements/edit", {announcement: foundAnnouncement})
        }
    })
})

//Update the announcement with the edit
router.put("/announcements/:id", isLoggedIn,  function(req, res){
    Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function(err, updatedAnouncement){
        if(err){
            console.log("Could not update announcement.");
            res.redirect("/announcements");
        }else{
            res.redirect("/announcements/" + req.params.id);
        }
    })
})

router.delete("/announcements/:id", isLoggedIn, function(req, res){
    Announcement.findByIdAndRemove(req.params.id, function(err, deletedAnnouncement){
        if(err){
            console.log("Could not delete announcement");
        }else{
            res.redirect("/announcements");
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/admin/register");
    }
}


module.exports = router;

