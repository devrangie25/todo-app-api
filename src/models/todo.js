const createTodoModel = (sequelize, DataTypes) => {
  const Todo = sequelize.define("tbl_todos",
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_set: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )

  return Todo
}

module.exports = createTodoModel
