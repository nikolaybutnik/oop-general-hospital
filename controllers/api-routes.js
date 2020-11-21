// Requiring our models and passport as we've configured it
// const db = require('../models')
// const passport = require('../config/passport')
const db = require('../models')
const express = require('express')
// const Patient = require('../models/new_patient')
const router = express.Router()

// Define an api route to generate new patient.
router.post('/api/patient', async (req, res) => {
  try {
    const info = await db.Patient.generatePatient()
    const createPatient = await db.Patient.create(info)
    // console.log(createPatient.dataValues)
    res.status(201).json(createPatient.dataValues)
  } catch (err) {
    if (err) {
      res.status(500).json(err)
    }
  }
})

// Define an api route to display all patients in the database.
router.get('/api/patient', async (req, res) => {
  try {
    const info = await db.Patient.findAll()
    const infoParsed = info.map((element) => element.dataValues)
    // console.log(infoParsed)
    res.status(200).json(infoParsed)
  } catch (err) {
    if (err) {
      res.status(500).json(err)
    }
  }
})

router.put('/api/patient/:id', (req, res) => {
  const patientId = req.params.id
  // console.log(req.body.healthStatus)
  // If {healthStatus: recovered}, update the patient in the database with a recovered status.
  if (req.body.healthStatus === 'recovered') {
    db.Patient.update(
      { healthStatus: 'recovered' },
      { where: { id: patientId } }
    ).then((patient) => {
      res.json(patient)
    })
    // If {healthStatus: dead}, update the patient in the database with a dead status.
  } else if (req.body.healthStatus === 'dead') {
    db.Patient.update(
      { healthStatus: 'dead' },
      { where: { id: patientId } }
    ).then((patient) => {
      res.json(patient)
    })
  }
})

// Export the router.
module.exports = router
