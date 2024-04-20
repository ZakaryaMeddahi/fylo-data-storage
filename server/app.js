const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');

// load environment variables
dotenv.config();

// create application instance
const app = express();

// local imports
const connect = require('./db/connect');
const authRouter = require('./routers/auth.router');
const filesRouter = require('./routers/files.router');
const authMiddleware = require('./middlewares/auth.middleware');
const multerMiddleware = require('./middlewares/multer.middleware');

// constants
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// middlewares
app.use(
  cors({
    origin: '*',
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/files', authMiddleware, multerMiddleware, filesRouter);

// start the server
app.listen(PORT, async () => {
  try {
    await connect(URI);
    console.log(`Server connected successfully at ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
