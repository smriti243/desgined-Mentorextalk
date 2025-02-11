const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const crypto = require('crypto');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const errorHandler = require('./middlewares/errorHandler');
const aiMentorRoutes = require('./routes/aiMentorRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

// ...


require('dotenv').config();




const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'default_or_placeholder_api_key';
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
  process.exit(1); // Exit the application
}

console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);



const app = express();
const PORT = process.env.PORT || 5000;


// Create an HTTP server
const server = http.createServer(app);

// Initialize socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: 'https://main.d2erika49f729w.amplifyapp.com/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/connections', connectionRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((conn) => {
  console.log('MongoDB connected');
  
  // Create storage engine
  const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
    const upload = multer({ storage });

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/feed', feedRoutes(io));
  app.use('/api/mentors', mentorRoutes);
  app.use('/api/v1/mentors', mentorRoutes);
  app.use('/api/resumes', resumeRoutes(upload, conn.connection.db));
 app.use('/api/ai-mentor', aiMentorRoutes);

  // Handle WebSocket connections
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Error handling middleware
  app.use(errorHandler);
  

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'Set' : 'Not set'}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

