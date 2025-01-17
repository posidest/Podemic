'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shelf = sequelize.define('Shelf', {
    name: DataTypes.STRING(50),
    podcasts: DataTypes.ARRAY(DataTypes.STRING),
    userId: DataTypes.INTEGER
  }, {});
  Shelf.associate = function(models) {
    Shelf.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Shelf;
};