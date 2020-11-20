// Requiring our models and passport as we've configured it
// const db = require('../models')
// const passport = require('../config/passport')
const db = require('../models')
const express = require('express')
const Patient = require('../models/new_patient')
const router = express.Router()

// Define an api route to generate new patient.
router.get('/api/newpatient', async (req, res) => {
  // const data = await Patient.generatePatientPhoto()
  const info = await Patient.generatePatient()
  res.render('index', { data: info })
})

router.get('/api/patient', (req, res) => {
  db.Patient.findAll().then((patients) => {
    res.json(patients)
  })
})

router.post('/api/patient', (req, res) => {
  const patient = req.body
  db.Disease.findOne({
    where: {
      maxTemperature: { $lte: patient.temperature },
      minTemperature: { $gte: patient.temperature },
      nausea: patient.nausea,
      dehydration: patient.dehydration,
      diarrhea: patient.diarrhea,
    },
  })
  db.Patient.create(patient).then(() => {
    res.status(200)
  })
})

// Export the router.
module.exports = router
