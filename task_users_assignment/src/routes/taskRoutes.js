const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;
