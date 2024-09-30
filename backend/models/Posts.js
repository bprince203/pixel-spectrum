const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    slug:{
        type: String,
        required: true
    },
    urls:{
        type: String,
        required: true,
        lowercase: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tags:[{
        type: String,
    }],
    category:[{
        type: String,
    }],
    created_at:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Posts', postsSchema);