var express = require('express');
var router = express.Router();
const Posts = require('../models/Posts')

// Route to fetch images
router.get('/fetchImages', async(req,res)=>{
    const images = await Posts.find({});
    res.status(200).json({images})
})

// Route to upload images
router.post('/uploadImages')
module.exports = router;