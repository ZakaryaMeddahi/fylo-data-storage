const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || undefined;

    console.log(req.method);

    if (!token) {
      res.status(401).json({
        message: 'Unauthorized: No token provided',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      res.status(401).json({
        message: 'Unauthorized',
      });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      res.status(401).json({
        message: `Unauthorized: ${error.message}`,
      });
      return;
    }
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = authMiddleware;
