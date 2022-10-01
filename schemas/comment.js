const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        // unique: true
    },
    cmtId: {
        type: Number,
        required: true,
        // unique: true
    },
    cmtContent: {
        type: String,
        required: true,
        // unique: true
    },
    cmtName: {
        type: String,
        required: true,
        // unique: true
    },
    cmtDate: {
        type: String //안되면 자료형 바꿔서 시도해보기 (object, date, string)
    }
});

module.exports = mongoose.model("Comment", commentSchema);
