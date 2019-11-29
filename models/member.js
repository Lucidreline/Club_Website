var mongoose = require("mongoose");

//Mongoose model
var MemberSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    class: String,
    position: String,
    bio: String,
    instagram: String,
    snapchat: String,
    twitter: String,
    linkedIn: String,
    image: String,
    imageId: String,
    boardMember: Boolean
});
var Member = mongoose.model("Member", MemberSchema);

module.exports = Member;