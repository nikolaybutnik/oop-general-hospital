// Reference the Log - Sick button and assign a click event.
const logSickButton = document.getElementById('logSick')
logSickButton.addEventListener('click', renderPatientsTable)
// Reference the Log - Recovered button and assign a click event.
const logRecoveredButton = document.getElementById('logRecovered')
logRecoveredButton.addEventListener('click', renderRecoveredPatientsTable)
// Reference the Log - Sick button and assign a click event.
const logDeadButton = document.getElementById('logDead')
logDeadButton.addEventListener('click', renderDeadPatientsTable)
// Reference the Operate button and assign a click event.
const operateButton = document.getElementById('operate')
operateButton.addEventListener('click', beginOperation)
const cleanupButton = document.getElementById('CleanRecords')
cleanupButton.addEventListener('click', beginCleanup)

// Render the sick patients table on page load
renderPatientsTable()

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
        sendToOperate,
        sendToOperateButton,
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

        // A button that sends a patient in the waiting list to the operating room.
        sendToOperate = document.createElement('td')
        sendToOperateButton = document.createElement('button')
        sendToOperateButton.setAttribute('class', 'btn btn-outline-primary')
        sendToOperateButton.innerHTML = 'Send to surgery'
        sendToOperateButton.setAttribute('data-patientId', patient.id)
        sendToOperateButton.addEventListener('click', sendToOperatingRoom)
        sendToOperate.appendChild(sendToOperateButton)
        patientRow.appendChild(sendToOperateButton)

        patientTableBody.appendChild(patientRow)
      }
    })
}

function renderRecoveredPatientsTable() {
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
        profilePic
      for (const patient of patients) {
        if (patient.healthStatus !== 'recovered') {
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

        patientTableBody.appendChild(patientRow)
      }
    })
}

function renderDeadPatientsTable() {
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
        profilePic
      for (const patient of patients) {
        if (patient.healthStatus !== 'dead') {
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

        patientTableBody.appendChild(patientRow)
      }
    })
}

// A function for the 'Cure Patient' button that sets the patient's status from 'sick' to 'recovered' if the
// operation is a success, but has a 1 in 10 chance of killing the patient.
function beginOperation() {
  const activityLog = document.getElementById('activityLog')
  const operatingTable = document.getElementById('operatingTable')
  if (operatingTable.hasChildNodes()) {
    const liveOrDie = Math.floor(Math.random() * 10) + 1
    // console.log(liveOrDie)
    // If the random number is 1, the patient dies.
    if (liveOrDie <= 5) {
      const patientId = document.getElementById('operatingTable').childNodes[1]
        .textContent
      console.log(patientId)
      fetch('/api/patient/' + patientId, {
        body: JSON.stringify({ healthStatus: 'dead' }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((response) => {
          renderPatientsTable()
          treatmentResults(liveOrDie)
          operatingTable.innerHTML = ''
        })
    } else {
      // If the random number is other than 1, the patient recovers.
      const patientId = document.getElementById('operatingTable').childNodes[1]
        .textContent
      console.log(patientId)
      fetch('/api/patient/' + patientId, {
        body: JSON.stringify({ healthStatus: 'recovered' }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((response) => {
          renderPatientsTable()
          treatmentResults(liveOrDie)
          operatingTable.innerHTML = ''
        })
    }
  } else {
    const listElement = document.createElement('li')
    activityLog.innerHTML = ''
    listElement.innerHTML = 'Bring in the next one!'
    activityLog.appendChild(listElement)
  }
}

// Function which shows the result of patient treatment in the activity log
function treatmentResults(liveOrDie) {
  const patientId = document.getElementById('operatingTable').childNodes[1]
    .textContent
  fetch('/api/patient/' + patientId)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      const activityLog = document.getElementById('activityLog')
      const listElement = document.createElement('li')
      if (liveOrDie <= 5) {
        activityLog.innerHTML = ''
        listElement.innerHTML = `Procedure to cure ${data.data.condition} failed! ${data.data.firstName} ${data.data.lastName} didn't make it...`
      } else {
        activityLog.innerHTML = ''
        listElement.innerHTML = `Procedure to cure ${data.data.condition} succeeded! ${data.data.firstName} ${data.data.lastName} made a full recovery and was discharged!`
      }
      activityLog.appendChild(listElement)
    })
}

// Function that takes a patient from the waiting area and sends them to the operating room.
function sendToOperatingRoom(event) {
  // console.log(document.getElementById('operatingTable').hasChildNodes())
  if (document.getElementById('operatingTable').hasChildNodes() === false) {
    const patientId = event.target.getAttribute('data-patientid')
    fetch('/api/patient/' + patientId, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        renderPatientsTable()
        document.getElementById('activityLog').innerHTML = ''
        document.getElementById('operatingTable').innerHTML = `
      <div style='display: none;'>${data.data.id}</div>
      <img src=${data.data.profilePhoto} alt="" width="100">
      <p>First name: ${data.data.firstName}</p>
      <p>Last name: ${data.data.lastName}</p>
      <p>Gender: ${data.data.gender}</p>
      <p>Age: ${data.data.age}</p>
      <p>Condition: ${data.data.condition}</p>
      <p>This may sting a little...</p>`
        console.log(data)
      })
  } else {
    const activityLog = document.getElementById('activityLog')
    const listElement = document.createElement('li')
    activityLog.innerHTML = ''
    listElement.innerHTML = "There's no room, wait your turn!"
    activityLog.appendChild(listElement)
  }
}

function beginCleanup() {
  const activityLog = document.getElementById('activityLog')
  fetch('/api/patient/', {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data.length === 0) {
        const listElement = document.createElement('li')
        activityLog.innerHTML = ''
        listElement.innerHTML =
          'The place is sparkling clean, no cleanup needed!'
        activityLog.appendChild(listElement)
      } else {
        const listElement = document.createElement('li')
        activityLog.innerHTML = ''
        listElement.innerHTML =
          "The cleanup crew has taken out the garbage! Please don't litter!"
        activityLog.appendChild(listElement)
      }
    })
  renderPatientsTable()
}

// This script handles the submission of the Admit Patient button (form)
// The event triggers a post request to the /api/patient route to generate
// a new patient and add them to the database.
document.getElementById('admit').addEventListener('click', function (event) {
  event.preventDefault()
  fetch('/api/patient', {
    method: 'POST',
  }).then(() => {
    renderPatientsTable()
  })
})

// This script handles the submission of the Recovered Patient button (form)
// The event triggers a post request to the /api/patient route to display
// revovered patients.
document
  .getElementById('logRecovered')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    fetch('/api/patient', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      // console.log(response)
      renderRecoveredPatientsTable()
    })
  })

// This script handles the submission of the Dead Patient button (form)
// The event triggers a post request to the /api/patient route to display
// revovered patients.
document.getElementById('logDead').addEventListener('submit', function (event) {
  event.preventDefault()
  fetch('/api/patient', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    // console.log(response)
    renderDeadPatientsTable()
  })
})

// Progress bar
// async function capacityBar() {
//   // Get an array of all currently sick patients.
//   const response = await fetch('/api/patient', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   })
//   const allpatients = await response.json()
//   const sickpatients = await allpatients.filter(
//     (patient) => patient.healthStatus === 'sick'
//   )
//   // console.log(allpatients)
//   // console.log(sickpatients)
//   // Set the maximum capacity of the hospital.
//   const maxCapacity = 200
//   // caclulate the percentage of currently sick patients that occupy the hospital.
//   const percentage = Math.ceil((sickpatients.length / maxCapacity) * 100)

//   const elem = document.getElementById('myBar')
//   const width = percentage

//   elem.style.width = width + '%'
//   elem.innerHTML = width + '%'
// }
