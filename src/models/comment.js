const mongoose=require('mongoose')
const {ModelName}=require('../utils/common')
const {Tweet, Comment}=ModelName
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    onModel:{
        type:String,
        enum:[Tweet,Comment],
        required:true
    },
    commentedOn:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true,
    }
},{timestamps: true})

const comment=mongoose.model('Comment',commentSchema)
module.exports=comment