var express = require("Express");
var router = express.Router();

//This is requiring the schema for a member
var Member = require("../models/member");

router.get("/", function(req, res){
    res.redirect("/home");
})

router.get("/home", function(req, res){
    var boardMembers, members, announcements;
    Member.find({boardMember:true}, function(err, foundMembers){
        if(err){
            console.log("Could not find members for /home")
        }else{
            res.render("mainPages/home",{boardMembers: foundMembers});
        }
    })
    
})

module.exports = router;