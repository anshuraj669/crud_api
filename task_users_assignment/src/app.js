const express = require('express');
const { sequelize } = require('..');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Sync database
  try {
    await sequelize.sync();
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
});
