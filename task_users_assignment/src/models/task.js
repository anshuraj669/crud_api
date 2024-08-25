module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    due_date: DataTypes.DATE,
  });
  return Task;
};
