var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//admin mongoose model
var adminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);