const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is missing!' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Token is invalid!' });
  }

  req.userId = decoded.userId;
  next();
};

module.exports = authMiddleware;
const bcrypt = require('bcryptjs');
const { User } = require('../..');
const { generateToken } = require('../utils/jwtUtils');

const register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });

  const token = generateToken(newUser.id);

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);

  res.status(200).json({ token });
};

module.exports = { register, login };
