const connectToMongo = require('./config/db');
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const site_url = process.env.FRONTEND_STIE_URL || 'http://localhost:5173'

// Serve static files from the 'post-images' directory
app.use('/post-images', express.static(path.join(__dirname, 'post-images')));

var cookies = require("cookie-parser");
app.use(express.json());

app.use(cookies());
// handling cores
app.use(cors({
    origin: `${site_url}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  // ... existing routes ...
  app.use('/api/v1/user/', require('./routes/users.js'))
  app.use('/api/v1/posts/', require('./routes/posts.js'))
  app.use('/api/v1/category/', require('./routes/category.js'))

  // admin  access routes
  app.use('/api/auth/user/', require('./controller/auth.js'))
  app.use('/api/auth/post/', require('./uploads/posts.js'))
  app.use('/api/auth/category/', require('./uploads/category.js'))
  
  connectToMongo()
  .then(() => {
    server.listen(5000, () => {
      console.log(`Server is  running over/on port ${5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
