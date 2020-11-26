# OOP General Hospital

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

OOP General Hospital is a web application that works with a MySQL database behind the scenes to simulate basic patient flow in a hospital environment. The application acts mainly as proof of concept, and is meant to be entertaining and light-hearted.

[Link to application]()

![OOP General Hospital Screenshot](https://github.com/ginajonas/oop-general-hospital/blob/main/public/assets/img/oop-general-hospital-screenshot.png?raw=true)

## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Built With](#Built-With)
4. [License](#License)
5. [Contributing](#Contributing)
6. [Tests](#Tests)
7. [Questions](#Questions)

## Installation

To install the application locally, run `npm install` in the CLI to install all dependencies required to run it. Navigate to `./config/config.json` and in the development section ensure that all information matches the local database environment. Refer to the [Usage section](#Usage) for information on how to use the application.

## Usage

To start the application locally, run `node server.js` or `npm run watch` from the CLI. [The app is also hosted on Heroku.](link)
This application simulates a basic hospital environmental by using a MySQL database in the backend to dynamically load and display the relevant groups of patients to the user. The user can perform the following actions by clicking the displayed buttons:

- Waiting Room: This button will access the database, find all patients with a health status of `sick`, and display the patients and relevant information in a table. Each entry will have a `cure` button assigned that will perform an action on that unique patient
- Cured Patients: This button will access the database, find all patient with a health status of `cured`, and display them in a table. These are the patients that were successfully cured of their ailments by the `operate` button.
- Unfortunate Accidents: This button will access the database, find all patient with a health status of `dead`, and display them in a table. These are the patients that have succumbed to their ailments due to unsuccessful treatment with the `operate` button.
- Admit Patient: This button admits a new patient into the `Waiting Room`. The `Waiting Room` can hold a maximum of 10 patients, which is reflected by a dynamically updated capacity bar above the patients table. When maximum capacity is reached, no more patients can be added until some patients are sent to undergo treatment.
- Bookkeeper: A high mortality rate does not look good on a hospital. This button will call up a trusted bookkeeper and solve this problem by accessing the database, finding all patients with a health status of `dead` and deleting them from the database. This effectively wipes all records of those patients ever existing.
- Cure: This button will take the patient that it's tied to, and send that patient to the operating room by changing their status to `operating`. Only one patient can be in the operating room at once, so the current patient will need to undergo treatment before the next patient can be sent in.
- Operate: This button will attempt to treat the patient that is currently in the operating room. If the room is empty nothing will happen. The procedure has a 50/50 chance to either cure the patient or kill them. If the treatment is successful, their health status is overwritten to `recovered` and the patient will now display in the `Cured Patients` table. If the treatment failed, their status becomes `dead` and they will be displayed in the `Unfortunate Accidents` table.

The basic application flow is to admit a patient (up to 10) with the `Admit Patient` button, send a patient to the operating room with the `cure button`, and perform a procedure with the `operate`. The results of the user's actions and success/failure of a treatment will be displayed as a message.

## Built With

The following technologies have been used in the creation of OOP General Hospital.

- [Random User Generator](https://randomuser.me/) - This API was used to generate an object with a variety of randomized information. These objects are the patients in the application.
- [DiceBear Avatars](https://avatars.dicebear.com/) - This API was used to randomly generate a pixel-art profile photo for each patient.
- [Anime.js](https://animejs.com/) - This JavaScript library was used to apply a variety of animations to buttons.
- [JavaScript](https://www.javascript.com/) - The programming language the application was written in.
- [Handlebars](https://handlebarsjs.com/) - Templating engine used for HTML.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Sequelize ORM](https://sequelize.org/) - Node.js ORM for MySQL integration.
- [MySQL](https://www.mysql.com/) - Database management system.

## License

This project is covered under the MIT license. To find out what is permitted under this license, click the license badge at the top of the README.

## Contributing

Feel free to submit any pull requests. All pull requests will be considered.

## Tests

No tests are currently written for this application.

## Questions

This project is a joint effort and the following collaborators may be contacted with questions regarded to this project:  
[Nikolay Butnik email address](mailto:btnk.nik@gmail.com) and [GitHub profile](https://github.com/nikolaybutnik)  
[Gina Jonas email address](mailto:ginajonas7@gmail.com) and [GitHub profile](https://github.com/ginajonas)  
[Ziyong He email address](mailto:ziyonghe94@gmail.com) and [GitHub profile](https://github.com/ZiyongHe)
