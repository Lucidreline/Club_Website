var mongoose = require("mongoose");

var announcementSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: {type: Date, default:Date.now}
});

module.exports = mongoose.model("Announcement", announcementSchema);