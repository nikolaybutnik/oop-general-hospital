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
const wipeRecordsButton = document.getElementById('CleanRecords')
wipeRecordsButton.addEventListener('click', cookTheBooks)

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
        sendToOperateButton.setAttribute('class', 'surgerybtn')
        sendToOperateButton.innerHTML =
          '<i class="fas fa-syringe fa-lg"></i>Cure'
        sendToOperateButton.setAttribute('data-patientId', patient.id)
        sendToOperateButton.addEventListener('click', sendToOperatingRoom)
        sendToOperate.appendChild(sendToOperateButton)
        patientRow.appendChild(sendToOperate)

        patientTableBody.appendChild(patientRow)
      }
      updateCapacityBar()
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
        .childNodes[3].childNodes[3].textContent
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
        .childNodes[3].childNodes[3].textContent
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
    listElement.innerHTML = 'Bring in the next patient!'
    activityLog.appendChild(listElement)
  }
}

// Function which shows the result of patient treatment in the activity log
function treatmentResults(liveOrDie) {
  const patientId = document.getElementById('operatingTable').childNodes[1]
    .childNodes[3].childNodes[3].textContent
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
    const patientId = event.currentTarget.getAttribute('data-patientid')
    fetch('/api/patient/' + patientId, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        renderPatientsTable()
        document.getElementById('activityLog').innerHTML = ''
        document.getElementById('operatingTable').innerHTML = `
        <div style="border: none;" class="card mx-auto">
        <img class="card-img-top" src=${data.data.profilePhoto} alt="Patient in operating room">
        <div class="card-body">
          <h4 class="card-title">${data.data.firstName} ${data.data.lastName}</h4>
          <p hidden class="card-text">${data.data.id}</p>
          <p class="card-text">Gender: ${data.data.gender}</p>
          <p class="card-text">Age: ${data.data.age}</p>
          <p class="card-text">Condition: ${data.data.condition}</p>
        </div>
      </div>`
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

function cookTheBooks() {
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
        listElement.innerHTML = 'The hospital is doing great, keep it up!'
        activityLog.appendChild(listElement)
      } else {
        const listElement = document.createElement('li')
        activityLog.innerHTML = ''
        listElement.innerHTML =
          'The bookkeeper worked their magic, records have been wiped clean!'
        activityLog.appendChild(listElement)
      }
    })
  renderPatientsTable()
}

// This script handles the submission of the Admit Patient button
// The event triggers a post request to the /api/patient route to generate
// a new patient and add them to the database.
document.getElementById('admit').addEventListener('click', function (event) {
  if (
    document.getElementById('myBar').textContent === '100% Capacity reached'
  ) {
    const activityLog = document.getElementById('activityLog')
    const listElement = document.createElement('li')
    activityLog.innerHTML = ''
    listElement.innerHTML = 'Maximum waiting room capacity has been reached!'
    activityLog.appendChild(listElement)
  } else {
    event.preventDefault()
    fetch('/api/patient', {
      method: 'POST',
    }).then(() => {
      renderPatientsTable()
    })
  }
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
// Update capacity bar when renderpatienttatble is called
async function updateCapacityBar() {
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
  const maxCapacity = 10
  // caclulate the percentage of currently sick patients that occupy the hospital.
  const percentage = Math.ceil((sickpatients.length / maxCapacity) * 100)

  const elem = document.getElementById('myBar')
  const width = percentage

  if (percentage < 100) {
    elem.style.width = width + '%'
    elem.style.backgroundColor = '#23adad'
    elem.innerHTML = width + '% Capacity'
  } else if (percentage === 100) {
    elem.style.width = width + '%'
    elem.style.backgroundColor = 'red'
    elem.innerHTML = '100% Capacity reached'
  }
}
