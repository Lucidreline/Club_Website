var mongoose = require("mongoose");

//Mongoose model
var MemberSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    position: String
});
var Member = mongoose.model("Member", MemberSchema);

module.exports = Member;