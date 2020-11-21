// Reference the Log - Sick button and assign a click event.
const logSickButton = document.getElementById('logSick')
logSickButton.addEventListener('click', renderPatientsTable)
// Reference the Log - Recovered button and assign a click event.
const logRecoveredButton = document.getElementById('logRecovered')
logRecoveredButton.addEventListener('click', renderPatientsTable)
// Reference the Log - Sick button and assign a click event.
const logDeadButton = document.getElementById('logDead')
logDeadButton.addEventListener('click', renderPatientsTable)

function renderPatientsTable() {
  fetch('/api/patient')
    .then((response) => response.json())
    .then((patients) => {
      const patientTableBody = document.querySelector('#patientsTable tbody')
      patientTableBody.innerHTML = ''
      let patientRow,
        patientProfilePic,
        patientFirstName,
        patientLastName,
        patientGender,
        patientAge,
        patientCondition,
        patientDischargeButton,
        dischargeButton,
        profilePic
      for (const patient of patients) {
        if (patient.healthStatus !== 'sick') {
          continue
        }
        patientRow = document.createElement('tr')

        patientProfilePic = document.createElement('td')
        profilePic = document.createElement('img')
        profilePic.setAttribute('src', patient.profilePhoto)
        patientProfilePic.appendChild(profilePic)
        patientRow.appendChild(patientProfilePic)

        patientFirstName = document.createElement('td')
        patientFirstName.innerHTML = patient.firstName
        patientRow.appendChild(patientFirstName)

        patientLastName = document.createElement('td')
        patientLastName.innerHTML = patient.lastName
        patientRow.appendChild(patientLastName)

        patientGender = document.createElement('td')
        patientGender.innerHTML = patient.gender
        patientRow.appendChild(patientGender)

        patientAge = document.createElement('td')
        patientAge.innerHTML = patient.age
        patientRow.appendChild(patientAge)

        patientCondition = document.createElement('td')
        patientCondition.innerHTML = patient.condition
        patientRow.appendChild(patientCondition)

        patientDischargeButton = document.createElement('td')
        dischargeButton = document.createElement('button')
        dischargeButton.innerHTML = 'Discharge'
        dischargeButton.setAttribute('data-patientId', patient.id)
        dischargeButton.addEventListener('click', dischargePatient)
        patientDischargeButton.appendChild(dischargeButton)
        patientRow.appendChild(patientDischargeButton)

        patientTableBody.appendChild(patientRow)
      }
    })
}

// A function for the 'Discharge' button that sets the patient's status from 'sick' to 'recovered'.
function dischargePatient(event) {
  const patientId = event.target.getAttribute('data-patientid')
  fetch('/api/patient/' + patientId, { method: 'PUT' })
    .then((response) => response.json())
    .then((patient) => {
      renderPatientsTable()
    })
}

// This script handles the submission of the Admit Patient button (form)
// The event triggers a post request to the /api/patient route to generate
// a new patient and add them to the database.
document.getElementById('admit').addEventListener('submit', function (event) {
  event.preventDefault()
  fetch('/api/patient', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    // console.log(response)
    renderPatientsTable()
  })
})

// Progress bar
async function capacityBar() {
  // Get an array of all currently sick patients.
  const response = await fetch('/api/patient', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const allpatients = await response.json()
  const sickpatients = await allpatients.filter(
    (patient) => patient.healthStatus === 'sick'
  )
  // console.log(allpatients)
  // console.log(sickpatients)
  // Set the maximum capacity of the hospital.
  const maxCapacity = 200
  // caclulate the percentage of currently sick patients that occupy the hospital.
  const percentage = Math.ceil((sickpatients.length / maxCapacity) * 100)

  const elem = document.getElementById('myBar')
  const width = percentage

  elem.style.width = width + '%'
  elem.innerHTML = width + '%'
}

capacityBar()
