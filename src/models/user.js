const bcrypt = require("bcrypt");

const createUserModel = (sequelize, DataTypes) => {

  const User = sequelize.define("tbl_users",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, 10)
          this.setDataValue("password", hash)
        },
        // bcrypt.compareSync('testPassword123', this.getDataValue('password'))
        // Will return true if password from db and password submitted is equal, else false
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      reset_token_expiration: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )

  return User
}

module.exports = createUserModel
