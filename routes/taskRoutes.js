const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

// GET /api/tasks - Get all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// POST /api/tasks - Create a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;