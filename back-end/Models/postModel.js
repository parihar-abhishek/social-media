const mongoose = require('mongoose')



const postSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            user:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                require:true
            }
        }
    ]

})

const Post = mongoose.model('Post',postSchema)
module.exports = Post