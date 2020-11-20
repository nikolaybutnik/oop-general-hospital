const { Model } = require('sequelize')
const fetch = require('node-fetch')

const diseases = [
  { name: 'Fish Odor Syndrome' },
  { name: 'Dreaming Rage' },
  { name: 'Sheep Scarring' },
  { name: 'Spine Soreness' },
  { name: 'Lime Feet' },
  { name: 'Stiffening Anxiety' },
  { name: 'Numbing Blisters' },
  { name: 'Frenzied Inflammation' },
  { name: 'Cat Inflammation' },
  { name: 'Fading Tumor' },
  { name: 'Undead Stomach' },
  { name: 'Pestilent Deficiency' },
  { name: 'Sage Disease' },
  { name: 'Explosive Anxiety' },
  { name: 'Rabid Syphilis' },
  { name: 'Running Asthma' },
  { name: 'Creeping Delusions' },
  { name: 'Aggressive Infertility' },
  { name: 'Animated Hands' },
  { name: 'Silent Blight' },
  { name: 'Exhausting Bronchitis' },
  { name: 'Marsh Lupus' },
  { name: 'Horse Anemia' },
  { name: 'Zombie Ulcers' },
  { name: 'Shaky Swelling' },
  { name: 'Frozen Dehydration' },
  { name: 'Phantom Aching' },
  { name: 'Weakening Mutation' },
  { name: 'Jumping Euphoria' },
  { name: 'Undead Poisoning' },
  { name: 'Jungle Finger' },
  { name: 'Delirious Paralysis' },
  { name: 'Mouse Hands' },
  { name: 'Wraith Fever' },
  { name: 'Happy Disease' },
  { name: 'Sedated Malaria' },
  { name: 'Grave Rash' },
  { name: 'Ogre Nausea' },
  { name: 'Angry Sores' },
  { name: 'Contagious Sleep Disorder' },
  { name: 'Trivial Tongue' },
  { name: 'Wild Warts' },
  { name: 'Elephant Cannibalism' },
  { name: 'Stimulated Cramps' },
  { name: 'Sniffling Fatigue' },
  { name: 'Pig Irritation' },
  { name: 'Shivering Hallucinations' },
  { name: 'Beer Paranoia' },
  { name: 'Rabid Cholera' },
]

module.exports = function (sequelize, DataTypes) {
  class Patient extends Model {
    static async generatePatient() {
      // Make a request to API to generate a random person
      const response = await fetch('https://randomuser.me/api/?nat=ca')
      const patient = await response.json()
      // Define  function that generates a random string
      function seed(length) {
        let result = ''
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          )
        }
        return result
      }
      let profilePhoto
      // Read the gender of generated patient and generate a profile photo
      if (patient.results[0].gender === 'male') {
        profilePhoto = `https://avatars.dicebear.com/api/male/${seed(20)}.svg`
      } else if (patient.results[0].gender === 'female') {
        profilePhoto = `https://avatars.dicebear.com/api/female/${seed(20)}.svg`
      }
      // Get a random health condition from diseases array by generating number.
      const randNum = Math.floor(Math.random() * diseases.length)
      const condition = diseases[randNum]

      // Create the new patient object and return it.
      const newPatient = {
        profilePhoto: profilePhoto,
        firstName: patient.results[0].name.first,
        lastName: patient.results[0].name.last,
        gender: patient.results[0].gender,
        age: patient.results[0].dob.age,
        condition: condition.name,
      }
      console.log(newPatient)
      return newPatient
    }

    static associate(models) {
      Patient.belongsTo(models.Disease, { foreignKey: { allowNull: true } })
    }
  }

  Patient.init(
    {
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false,
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
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // There will be 3 statuses: sick, recovered, dead
      healthStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'sick',
      },
    },
    { sequelize }
  )

  Patient.sync()

  return Patient
}
