// Requiring our models and passport as we've configured it
// const db = require('../models')
// const passport = require('../config/passport')
const db = require('../models')
const express = require('express')
// const Patient = require('../models/new_patient')
const router = express.Router()

// Define an api route to generate new patient. Render the patient to index.handlebars.
router.post('/api/patient', async (req, res) => {
  try {
    const info = await db.Patient.generatePatient()
    const createPatient = await db.Patient.create(info)
    // console.log(createPatient)
    res.json(createPatient)
    // res.render('index', { data: createPatient.dataValues })
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
})

// Define an api route to display all patients in the database.
router.get('/api/allpatients', async (req, res) => {
  try {
    const info = await db.Patient.findAll()
    const infoParsed = info.map(element => element.dataValues)
    console.log(infoParsed)
    res.json(infoParsed)
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
})

router.put('/api/patient/:id', (req, res) => {
  const patientId = req.params.id
  db.Patient.update(
    { healthStatus: 'recovered' },
    { where: { id: patientId } }
  ).then((patient) => {
    res.json(patient)
  })
})

// Export the router.
module.exports = router
