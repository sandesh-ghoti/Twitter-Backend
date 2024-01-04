const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        bio: {
            type: String,
        },
        avatar: {
            publicId: String,
            url: String,
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ]
    },
    {
        timestamps: true,
    }
);
module.exports=mongoose.model('User',userSchema)