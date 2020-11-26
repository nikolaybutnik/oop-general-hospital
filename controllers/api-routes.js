// Requiring our models and passport as we've configured it
// const db = require('../models')
// const passport = require('../config/passport')
const db = require('../models')
const express = require('express')
// const Patient = require('../models/new_patient')
const router = express.Router()

// Default route that renders the screen.
router.get('/', function (req, res) {
  res.render('index')
})

// Define an api route to generate new patient.
router.post('/api/patient', async (req, res) => {
  try {
    // const info = await db.Patient.generatePatient()
    const createPatient = await db.Patient.create(req.body)
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
  try {
    if (req.body.healthStatus === 'recovered') {
      db.Patient.update(
        { healthStatus: 'recovered' },
        { where: { id: patientId } }
      ).then((patient) => {
        res.status(200).json(patient)
      })
      // If {healthStatus: dead}, update the patient in the database with a dead status.
    } else if (req.body.healthStatus === 'dead') {
      db.Patient.update(
        { healthStatus: 'dead' },
        { where: { id: patientId } }
      ).then((patient) => {
        res.status(200).json(patient)
      })
    }
  } catch (err) {
    if (err) {
      res.status(500).json(err)
    }
  }
})

// Define a route that will update a patient's health status to 'operating'
router.patch('/api/patient/:id', async (req, res) => {
  const patientId = await req.params.id
  const targetPatient = await db.Patient.findOne({ where: { id: patientId } })
  // console.log(targetPatient.dataValues)
  try {
    db.Patient.update(
      { healthStatus: 'operating' },
      { where: { id: patientId } }
    ).then((patient) => {
      res.status(200).json({ data: targetPatient.dataValues })
      // console.log(targetPatient.dataValues)
    })
  } catch (err) {
    if (err) {
      res.status(500).json(err)
    }
  }
})

// Define a route that returns that sends a patient object clicked with Cure Patient button.
router.get('/api/patient/:id', async (req, res) => {
  try {
    const patientId = await req.params.id
    const targetPatient = await db.Patient.findOne({ where: { id: patientId } })
    console.log(targetPatient.dataValues)
    res.status(200).json({ data: targetPatient.dataValues })
  } catch (err) {
    if (err) {
      res.status(500).json(err)
    }
  }
})

// Define a route that will delete all patients with healthStatus of 'dead'.
router.delete('/api/patient', async (req, res) => {
  try {
    const rip = await db.Patient.findAll({
      where: {
        healthStatus: 'dead',
      },
    })
    const ripArray = []
    rip.forEach((element) => {
      ripArray.push(element.dataValues)
    })
    // console.log(ripArray)
    db.Patient.destroy({
      where: {
        healthStatus: 'dead',
      },
    })
    res.status(200).json(ripArray)
  } catch (err) {
    if (err) {
      res.status(500).json(err)
    }
  }
})

// Export the router.
module.exports = router
