// 📁middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Verify token and attach user to req
exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};

// Role-based access
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: 'Forbidden: Insufficient rights' });
    next();
  };
};
