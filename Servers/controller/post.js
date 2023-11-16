const express= require('express');
const router = express.Router();
const userMessage = require('../model/userModel.js');
const { v4: uuidv4 } = require('uuid');
const createMessage = async (req,res) => {
    try {
        const data = req.body;
        const msgId = uuidv4();
        const {title, message, creator, tags, selectedFile} = data;
        const newMessage = new userMessage ({
            msgId,
            title,
            message,
            creator,
            tags,
            selectedFile
        });
        await newMessage.save();
        return res.json({
            message: `message added successfully`,
            success: true,
            statusCode: 201,
            data: {
                msgId,
                data
            }
        });
    } catch (error) {
        console.log(error,'error in creating the user');
        throw new Error(error);
    }
}

const getMessageById = async (req,res) => {
    try {
        const id  = req.params;
        const data = await userMessage.findOne({_id: id});
        if (data.length < 0) {
            console.log('no messages',data);
        }
        return res.json({
            message:`messages`,
            data: {
                data
            },
            success: true
        });
    } catch (error) {
        console.log(error,'error in retrieving the messages');
        throw new Error(error);
    }
}

const getMessages = async (req,res) => {
    try {
        const data = await userMessage.find();
        console.log(data,'getMessages');
        return res.json({
            data
        });
    } catch (error) {
        console.log(error,'error in retrieving all users');
        throw new Error(error);
    }
}

const updateMessage = async (req, res) => {
    try {
        const id = req.params;
        const data = req.body;
        const {title,message} = data;
        const updated= await userMessage.updateOne({_id: id}, {title, message},{new: true});
        console.log('updated',updated);
        return res.json({
            message: 'message updated successfully',
            data: {
                data
            },
            success: true
        })
    } catch (error) {
        console.log(error);
        throw new Error (error,'error in retriving all user messages');
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

module.exports = {
     createMessage, getMessageById, getMessages, updateMessage
}
