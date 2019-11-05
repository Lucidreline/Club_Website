var express = require("express");
var router = express.Router();

//require the model for mongoose
var Admin = require("../models/admin");

//Create a new
router.get("/admin/login", function(req, res){
    res.render("admin/login")
});

//secretPage
router.get("/secret", function(req, res){
    res.render("admin/secret");
})

router.post("/admin/login", function(req, res){
    
});

// router.post("/admin/register", function(req, res){
     
// });



module.exports = router