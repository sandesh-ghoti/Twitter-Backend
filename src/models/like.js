const mongoose = require("mongoose");
const {ModelName}=require('../utils/common')
const {Tweet, Comment}=ModelName
const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    onModel:{
        type:String,
        enum:[Tweet,Comment],
        required:true
    },
    likedOn:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true,
    }
},{timestamps: true});

const like = mongoose.model("Like", likeSchema);
module.exports = like;