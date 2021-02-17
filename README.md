<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/nikolaybutnik/star-academy">
    <img src="./client/src/Assets/staracademyIcon.png" alt="Logo" width="50" height="50">
  </a> -->

  <h3 align="center">OOP General Hospital</h3>

  <p align="center">
    Object Oriented Programming Hospital Simulation
    <br />
    <a href="https://github.com/nikolaybutnik/oop-general-hospital"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mysterious-brushlands-46606.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/nikolaybutnik/oop-general-hospital/issues">Report Bug</a>
    ·
    <a href="https://github.com/nikolaybutnik/oop-general-hospital/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![OOP General Hospital Screenshot](https://github.com/nikolaybutnik/oop-general-hospital/blob/main/public/assets/img/oop-general-hospital-screenshot.png?raw=true)

OOP General Hospital is a web application that works with a MySQL database behind the scenes to simulate basic patient flow in a hospital environment. The application acts mainly as proof of concept, and is meant to be entertaining and light-hearted.

### Built With

The following technologies and libraries were used in the creation of OOP General Hospital:

- [Random User Generator](https://randomuser.me/) - This API was used to generate an object with a variety of randomized information. These objects are the patients in the application.
- [DiceBear Avatars](https://avatars.dicebear.com/) - This API was used to randomly generate a pixel-art profile photo for each patient.
- [Anime.js](https://animejs.com/) - This JavaScript library was used to apply a variety of animations to buttons.
- [JavaScript](https://www.javascript.com/) - The programming language the application was written in.
- [Handlebars](https://handlebarsjs.com/) - Templating engine used for HTML.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Sequelize ORM](https://sequelize.org/) - Node.js ORM for MySQL integration.
- [MySQL](https://www.mysql.com/) - Database management system.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- MySQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nikolaybutnik/star-academy
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Navigate to `./config/config.json` and in the development section ensure that all information matches the local database environment.
4. You're ready to go!
   ```sh
   npm start
   ```

<!-- USAGE EXAMPLES -->

## Usage

This application simulates a basic hospital environmental by using a MySQL database in the backend to dynamically load and display the relevant groups of patients to the user. The user can perform the following actions by clicking the displayed buttons:

- Waiting Room: This button will access the database, find all patients with a health status of `sick`, and display the patients and relevant information in a table. Each entry will have a `cure` button assigned that will perform an action on that unique patient
- Cured Patients: This button will access the database, find all patient with a health status of `cured`, and display them in a table. These are the patients that were successfully cured of their ailments by the `operate` button.
- Unfortunate Accidents: This button will access the database, find all patient with a health status of `dead`, and display them in a table. These are the patients that have succumbed to their ailments due to unsuccessful treatment with the `operate` button.
- Admit Patient: This button admits a new patient into the `Waiting Room`. The `Waiting Room` can hold a maximum of 10 patients, which is reflected by a dynamically updated capacity bar above the patients table. When maximum capacity is reached, no more patients can be added until some patients are sent to undergo treatment.
- Bookkeeper: A high mortality rate does not look good on a hospital. This button will call up a trusted bookkeeper and solve this problem by accessing the database, finding all patients with a health status of `dead` and deleting them from the database. This effectively wipes all records of those patients ever existing.
- Cure: This button will take the patient that it's tied to, and send that patient to the operating room by changing their status to `operating`. Only one patient can be in the operating room at once, so the current patient will need to undergo treatment before the next patient can be sent in.
- Operate: This button will attempt to treat the patient that is currently in the operating room. If the room is empty nothing will happen. The procedure has a 50/50 chance to either cure the patient or kill them. If the treatment is successful, their health status is overwritten to `recovered` and the patient will now display in the `Cured Patients` table. If the treatment failed, their status becomes `dead` and they will be displayed in the `Unfortunate Accidents` table.

The basic application flow is to admit a patient (up to 10) with the `Admit Patient` button, send a patient to the operating room with the `cure button`, and perform a procedure with the `operate`. The results of the user's actions and success/failure of a treatment will be displayed as a message.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/nikolaybutnik/oop-general-hospital/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Nikolay Butnik - [LinkedIn](https://www.linkedin.com/in/nikolay-butnik/) - btnk.nik@gmail.com

Gerogina Jonas - [LinkedIn](https://www.linkedin.com/in/georgina-jonas-1796531b3/) - ginajonas7@gmail.com

Ziyong He - [LinkedIn](https://www.linkedin.com/in/ziyonghe/) - ziyonghe94@gmail.com

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Choose an Open Source License](https://choosealicense.com)
- [Font Awesome](https://fontawesome.com)
- [Heroku](https://heroku.com)
