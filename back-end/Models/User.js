const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    followers:[
        {
            user:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                require:true
            }
        }
    ],
    following:[
        {
            user:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                require:true
            }
        }
    ],
    savedPost:[

    ]
})

const User = mongoose.model('User',userSchema)
module.exports = User