module.exports = function (sequelize, DataTypes) {
  return sequelize.define('data', {
    id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, { tableName: 'data', paranoid: true });
};
