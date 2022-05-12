import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initEquipmentModel from './item.mjs';
import initDrummerModel from './drummer.mjs';
import initReservationModel from './reservation.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// add your model definitions to db here
db.Drummer = initDrummerModel(sequelize, Sequelize.DataTypes);
db.Reservation = initReservationModel(sequelize, Sequelize.DataTypes);
db.Equipment = initEquipmentModel(sequelize, Sequelize.DataTypes);

db.Reservation.belongsTo(db.Drummer);
db.Drummer.hasMany(db.Reservation);
db.Equipment.belongsTo(db.Drummer);
db.Drummer.hasMany(db.Equipment);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
