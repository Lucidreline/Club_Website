var express = require("express");
var router = express.Router();
var passport = require("passport");
var localStrategy = require("passport-local")

require("dotenv").config();

//require the model for mongoose
var Admin = require("../models/admin");

passport.use(new localStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


//Register ============================
router.get("/admin/register", function(req, res){
    res.render("admin/register")
});

router.post("/admin/register", function(req, res){
    req.body.username;
    req.body.password;
    if(req.body.key == process.env.ADMIN_KEY){
        Admin.register(new Admin({username: req.body.username}), req.body.password, function(err, admin){
            if(err){
                console.log("Error registering a new Admin");
                return res.render("admin/register");
            }
            passport.authenticate("local")(req, res, function(){
                res.render("mainPages/home");
            })
        })
    }else{
        res.render("admin/register");
    }
})
//==========================================

//Login ====================================
router.post("/admin/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/admin/register"
}) ,function(req, res){

})
//==========================================

//LOG OUT =================================
router.get("/admin/logout", function(req, res){
    req.logOut();
    res.redirect("/");
})
//==========================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/admin/register");
    }
}

module.exports = router