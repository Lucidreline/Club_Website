var express = require("Express");
var router = express.Router();

router.get("/home", function(req, res){
    res.render("mainPages/home");
})

module.exports = router;