const { Task, User } = require('../..');
const { Op } = require('sequelize');

const createTask = async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;

  const newTask = await Task.create({
    title,
    description,
    status,
    priority,
    due_date,
    userId: req.userId
  });

  res.status(201).json(newTask);
};

const getTasks = async (req, res) => {
  const { status, priority, due_date, search } = req.query;

  let where = { userId: req.userId };

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (due_date) where.due_date = due_date;
  if (search) {
    where = {
      ...where,
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    };
  }

  const tasks = await Task.findAll({ where });
  res.status(200).json(tasks);
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, priority, due_date } = req.body;

  const task = await Task.findOne({ where: { id: taskId, userId: req.userId } });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.update({ title, description, status, priority, due_date });

  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findOne({ where: { id: taskId, userId: req.userId } });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.destroy();

  res.status(200).json({ message: 'Task deleted successfully' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
