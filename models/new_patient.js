// Require the node-fetch package to be able to make fetch calls through node.
const fetch = require('node-fetch')

class NewPatient {
  constructor({ firstName, lastName, gender, age, disease }) {
    this.first_name = firstName
    this.last_name = lastName
    this.gender = gender
    this.age = age
    this.disease = disease
  }

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
    // Create the new patient onject and return it.
    const newPatient = {
      profilePhoto: profilePhoto,
      firstName: patient.results[0].name.first,
      lastName: patient.results[0].name.last,
      gender: patient.results[0].gender,
      age: patient.results[0].dob.age,
    }
    console.log(newPatient)
    return newPatient
  }

  static async getAllPatients() {}

  static async getCovidPatients() {}
}

module.exports = NewPatient
