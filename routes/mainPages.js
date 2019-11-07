var express = require("Express");
var router = express.Router();

//This is requiring the schema for a member
var Member = require("../models/member");
var Announcement = require("../models/announcement");


router.get("/", function(req, res){
    res.redirect("/home");
})

router.get("/home", async function(req, res){
    var boardMembers, members, announcements;
    //await means we can move on from the code untl it is completely finished
    await Member.find({boardMember:true}, function(err, foundBoardMembers){
        if(err){
            console.log("Could not find members for /home")
        }else{
            boardMembers = foundBoardMembers;
        }
    }) 
    //Blog.find({}).sort({"_id": -1}).exec(function(err, blogs) {....});
    //await Member.find({}, function(err, foundMembers){
    //await Member.find({}, function(err, foundMembers){
    await Member.find({}).sort({"_id": -1}).exec(function(err, foundMembers) {
        if(err){
            console.log("Could not find members for /home")
        }else{
            members = foundMembers;
        }
    }) 

    await Announcement.find({}, function(err, foundAnnouncements){
        if(err){
            console.log("Could not find members for /home")
        }else{
            announcements = foundAnnouncements;
        }
    }) 

    res.render("mainPages/home",{bMembers: boardMembers, allMembers: members, announcements: announcements});
   
})

module.exports = router;