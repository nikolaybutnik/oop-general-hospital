class NewPatient {
  constructor({ firstName, lastName, gender, age, disease }) {
    this.first_name = firstName
    this.last_name = lastName
    this.gender = gender
    this.age = age
    this.covid = disease
  }

  // https://avatars.dicebear.com/api/:sprites/:seed.svg
  // Replace :sprites with male, female, human, identicon, initials, bottts, avataaars, jdenticon or gridy.
  // The value of :seed can be anything you like - but don't use any sensitive or personal data here!
  async profilePic() {
    // Generate a random number from 0 to 9
    // const randNum = await Math.floor(Math.random() * 10);
    // Define  function that generates a random string
    // function seed (length) {
    //     let result = '';
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for ( var i = 0; i < length; i++ ) {
    //        result += characters.charAt(Math.floor(Math.random() * characters.length));
    //     }
    //     return result;
    //  }
    // switch (randNum) { // if number is odd, return male
    //     case (randNum % 2 !== 0):
    //         return `https://avatars.dicebear.com/api/male/${}.svg`
    // }
  }

  static async getAllPatients() {}

  static async getCovidPatients() {}
}

module.exports = NewPatient
