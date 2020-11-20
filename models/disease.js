module.exports = function (Sequelize, DataTypes) {
  const Disease = Sequelize.define('Disease', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    minTemperature: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    maxTemperature: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
  })
  // Disease.associate = function (models) {
  //   Disease.hasMany(models.Patient)
  // }
  
  Disease.sync()

  return Disease
}
