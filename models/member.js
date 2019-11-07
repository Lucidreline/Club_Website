var mongoose = require("mongoose");

//Mongoose model
var MemberSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    position: String,
    image: String,
    boardMember: Boolean
});
var Member = mongoose.model("Member", MemberSchema);

module.exports = Member;