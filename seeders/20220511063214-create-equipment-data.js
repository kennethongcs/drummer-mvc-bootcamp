const { query } = require('express');

module.exports = {
  async up(queryInterface, Sequelize) {
    const equipmentList = [
      {
        drummer_id: 1,
        name: 'drums',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        drummer_id: 2,
        name: 'bells',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        drummer_id: 3,
        name: 'gongs',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        drummer_id: 4,
        name: 'tambourines',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('equipments', equipmentList);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('equipments', null, {});
  },
};
