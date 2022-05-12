export default function initEquipmentModel(sequelize, DataTypes) {
  return sequelize.define(
    'item',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      drummer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'drummers',
          key: 'id',
        },
      },
      name: {
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
    },
    {
      tableName: 'equipments',
    }
  );
}
