var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const verifyToken = require('../middleware/verifyToken')
var router = express.Router();

const secretKey = process.env.JWT_TOKEN;

// Route to validate user
router.get('/validate',verifyToken,async (req,res)=>{
    const user = await Users.length;
    res.json({ message: 'This is a secure route',success:true});
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "No account found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

        res.cookie("authToken", token, {
            maxAge: 3600000,
            secure: true, // Set to false for non-HTTPS development
            sameSite: 'None',
            });

        return res.status(200).json({
            success: true,
            authToken: token,
        });

    } catch (error) {
        console.error('Error in login user', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Route to create a new admin account
router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password, role } = req.body;

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Already have an account; please login.' });
        }

        const validUsername = await Users.findOne({ username });
        if (validUsername) {
            return res.status(400).json({ message: 'Username not valid' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            name,
            username,
            email,
            password: hashPassword,
            role
        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });

        res.status(201).json({ message: 'User saved successfully', authToken: token, success: true, id: newUser.id });

    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;