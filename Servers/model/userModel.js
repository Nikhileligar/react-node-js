const { Schema, model } = require("mongoose");
const userSchema = new Schema ({
    msgId: String,
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const userMessage = model('userMessage',userSchema);
module.exports = userMessage;