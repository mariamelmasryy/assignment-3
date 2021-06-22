module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('data', {
    id: {
      type: Sequelize.DOUBLE,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    type: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface) => queryInterface.dropTable('data')
};
