module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('drummers', 'price', {
      type: Sequelize.DECIMAL,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('drummers', 'price');
  },
};
