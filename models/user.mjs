export default function initUserModel(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.TEXT,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
}
