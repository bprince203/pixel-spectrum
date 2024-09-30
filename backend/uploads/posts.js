var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Posts = require('../models/Posts');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');
var router = express.Router();


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'post-images/'); // Uploads will be stored in the 'post-images' directory
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // const extension = file.originalname.split('.').pop();
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to add post
router.post('/add-post',verifyToken,upload.single('postImg'), async (req, res) => {
  try {
    const { slug, postTitle, postDesc, tags, category } = req.body;
    const imageUrl = 'post-images/' + req.file.filename; // Use the filename from multer
    const splitTags = tags.split(" ");
    const convertedSlug = slug.replace(/ /g, "-");

    const newPost = new Posts({
      slug: convertedSlug,
      urls: imageUrl,
      title: postTitle,
      description: postDesc,
      tags: splitTags,
      category
    });

    await newPost.save();

    // Send a success response
    res.status(200).json({ message: 'Post added successfully', newPost });
  } catch (error) {
    console.error('Error adding post:', error.message);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch posts
router.get('/fetch-posts',verifyToken, async(req,res)=>{
    try {
        const posts = await Posts.find({});
        res.status(200).json(posts)
    } catch (error) {
        console.error('Error fetching  post:', error.message);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;