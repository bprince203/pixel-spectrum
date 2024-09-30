const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const secretKey = process.env.JWT_TOKEN;

function verifyToken(req, res, next) {
  // Retrieve the token from the authToken cookie
  const token = req.cookies.authToken;
  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, async(err, decoded) => {
    // Handle verification errors
    if (err) {
      // console.error('Error verifying token:', err);
      res.clearCookie('authToken')
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Set the user identifier on the request object
    const user = await Users.findById(decoded.id);
    if(!user){
      res.clearCookie('authToken')
      return res.status(401).json({ message: 'Invalid token' });
    }
      req.userId = decoded.id; // Adjust property name as needed
    // Continue processing the next middleware or route handler
    next();
  });
}

module.exports = verifyToken;