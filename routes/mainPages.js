var express = require("Express");
var router = express.Router();

router.get("/", function(req, res){
    res.redirect("/home");
})

router.get("/home", function(req, res){
    res.render("mainPages/home",{currentAdmin: req.user});
})

module.exports = router;