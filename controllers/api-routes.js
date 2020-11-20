// Requiring our models and passport as we've configured it
// const db = require('../models')
// const passport = require('../config/passport')
const db = require('../models')
const express = require('express')
// const Patient = require('../models/new_patient')
const router = express.Router()

// Define an api route to generate new patient. Render the patient to index.handlebars.
router.get('/api/newpatient', async (req, res) => {
  try {
    const info = await db.Patient.generatePatient()
    const createPatient = await db.Patient.create(info)
    // console.log(createPatient)
    res.render('index', { data: createPatient.dataValues })
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
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
