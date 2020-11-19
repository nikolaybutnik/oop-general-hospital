module.exports = function (Sequelize, DataTypes) {
  const Patient = Sequelize.define('Patient', {
    admittedDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    covidStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    healthStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })
  Patient.associate = function (models) {
    Patient.belongsTo(models.Disease, { foreignKey: { allowNull: true } })
  }
  return Patient
}
