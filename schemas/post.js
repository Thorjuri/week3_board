const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        // unique: true
    },
    postContent: {
        type: String,
        required: true,
        // unique: true
    },
    postName: {
        type: String,
        required: true,
        // unique: true
    },
    postDate: {
        type: Number //안되면 자료형 바꿔서 시도해보기 (object, date, string)
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model("Post", postSchema);