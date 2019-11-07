var express = require("express");
var router = express.Router();
require("dotenv").config();

//This is requiring the schema for a member
var Member = require("../models/member");

// For Image Uploading ---------------
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'clubphotos', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


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
router.post("/members", isLoggedIn, upload.single("image"), function(req, res){
    //create member
        //removes the script from position... not useful now but it will later
    //req.body.member.position = req.sanitize(req.body.member.body)
    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log("Could not upload photo to cloudinary: " + err);
            return res.redirect("back");
        }
        req.body.member.image = result.secure_url;
        req.body.member.imageId = result.public_id;
        
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
router.put("/members/:id", isLoggedIn, upload.single("image"), function(req, res){
    //Member.findByIdAndUpdate(ID to find, new DataCue, callback)
    Member.findById(req.params.id, async function(err, foundMember){
        if(err){
            console.log("Could not update member");
            res.redirect("/members")
        }else{
            if(req.file){
                try{
                    await cloudinary.uploader.destroy(foundMember.imageId)
                    var result = await cloudinary.uploader.upload(req.file.path)
                    foundMember.image = result.secure_url;
                    foundMember.imageId = result.public_id; 
                }catch(err){
                    console.log("Could not update image");
                    return res.redirect("/members")
                }                
            }
                //This allows us to remove someone as a board member
            if(req.body.member.boardMember){
                //if the checkbox is not clicked
                foundMember.boardMember = true;
            }else{
                foundMember.boardMember = false;
            }
            foundMember.firstName = req.body.member.firstName
            foundMember.lastName = req.body.member.lastName
            foundMember.position  = req.body.member.position
            foundMember.class = req.body.member.class
            foundMember.bio = req.body.member.bio
            foundMember.save()
            res.redirect("/members/" + foundMember._id);
        }
    })
})


//DESTROYER!
router.delete("/members/:id", isLoggedIn, function(req, res){
    Member.findById(req.params.id, async function(err, foundMember){
        if(err){
            console.log("Could not delete member");
            res.redirect("/members");
        }
        else{
            await cloudinary.uploader.destroy(foundMember.imageId);
            foundMember.remove();

            res.redirect("/members");
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