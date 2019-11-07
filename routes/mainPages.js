var express = require("Express");
var router = express.Router();

//This is requiring the schema for a member
var Member = require("../models/member");
var Announcement = require("../models/announcement");


router.get("/", function(req, res){
    res.redirect("/home");
})

router.get("/home",function(req, res){
    var boardMembers, members, announcements;
    //means we can move on from the code untl it is completely finished
    Member.find({boardMember:true}, function(err, foundBoardMembers){
        if(err){
            console.log("Could not find board members for /home... : " + err.message);
        }else{
            boardMembers = foundBoardMembers;
            Member.find({}).sort({"_id": -1}).exec(function(err, foundMembers) {
                if(err){
                    console.log("Could not find members for /home... : " + err.message);
                }else{
                    members = foundMembers;
                    Announcement.find({}).sort({"_id": -1}).exec(function(err, foundAnnouncements) {
                        if(err){
                            console.log("Could not find announcements for /home... : " + err.message);
                        }else{
                            announcements = foundAnnouncements;
                            res.render("mainPages/home",{bMembers: boardMembers, allMembers: members, announcements: announcements});
                        }
                    }) 
                }
            }) 
        }
    }) 
   
    

    


    
   
})

module.exports = router;