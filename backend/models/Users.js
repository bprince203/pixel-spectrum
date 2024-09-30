const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email:{
        type: String,
        lowercase:true,
        trim:true,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        lowercase: true
    },
    gender:{
        type: String,
        default: 'Male'
    },
    profileUrl:{
        type:String,
        default:'demo.png',
    },
    status:{
        type: Number,
        default:0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('User', userSchema);