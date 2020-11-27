// Reference the Waiting Room button and assign a click event.
const logSickButton = document.getElementById('logSick')
logSickButton.addEventListener('click', renderPatientsTable)
// Reference the Recovered Patients button and assign a click event.
const logRecoveredButton = document.getElementById('logRecovered')
logRecoveredButton.addEventListener('click', renderRecoveredPatientsTable)
// Reference the Unfortunate Accidents button and assign a click event.
const logDeadButton = document.getElementById('logDead')
logDeadButton.addEventListener('click', renderDeadPatientsTable)
// Reference the Operate button and assign a click event.
const operateButton = document.getElementById('operate')
operateButton.addEventListener('click', beginOperation)
// Reference the Bookkeeper button and assign a click event.
const wipeRecordsButton = document.getElementById('CleanRecords')
wipeRecordsButton.addEventListener('click', cookTheBooks)

// Render the sick patients table on page load
renderPatientsTable()

// A function that renders a table of all patients with 'sick' status.
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

// A function that renders a table of all patients with 'recovered' status.
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

// A function that renders a table of all patients with 'dead' status.
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
// operation is a success, but has a 50/50 chance of killing the patient.
function beginOperation() {
  const activityLog = document.getElementById('activityLog')
  const operatingTable = document.getElementById('operatingTable')
  // If the div has a child node, aka if a patient is present in the operating room, proceed with the operation.
  if (operatingTable.hasChildNodes()) {
    const liveOrDie = Math.floor(Math.random() * 10) + 1
    // If the random number is less than or equal to 5, the patient dies.
    if (liveOrDie <= 5) {
      const patientId = document.getElementById('operatingTable').childNodes[1]
        .childNodes[3].childNodes[3].textContent
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
      // If the random number is greater than 5, the patient recovers.
      const patientId = document.getElementById('operatingTable').childNodes[1]
        .childNodes[3].childNodes[3].textContent
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
    // If the div has no patient present, prompt the user to send one.
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
      const activityLog = document.getElementById('activityLog')
      const listElement = document.createElement('li')
      if (liveOrDie <= 5) {
        activityLog.innerHTML = ''
        listElement.innerHTML = `Procedure to cure ${data.data.condition} failed! ${data.data.firstName} ${data.data.lastName} didn't make it... <i class="fas fa-dizzy"></i>`
      } else {
        activityLog.innerHTML = ''
        listElement.innerHTML = `Procedure to cure ${data.data.condition} succeeded! ${data.data.firstName} ${data.data.lastName} made a full recovery and was discharged! <i class="fas fa-smile-beam"></i>`
      }
      activityLog.appendChild(listElement)
    })
}

// Function that takes a patient from the waiting area and sends them to the operating room.
function sendToOperatingRoom(event) {
  // If the div has no child nodes, proceed with sendint the patient in.
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
        <img style="max-height: 10rem;" class="card-img-top" src=${data.data.profilePhoto} alt="Patient in operating room">
        <div class="card-body">
          <h4 class="card-title">${data.data.firstName} ${data.data.lastName}</h4>
          <p hidden class="card-text">${data.data.id}</p>
          <p class="card-text">Gender: ${data.data.gender}</p>
          <p class="card-text">Age: ${data.data.age}</p>
          <p class="card-text">Condition: ${data.data.condition}</p>
        </div>
      </div>`
        const activityLog = document.getElementById('activityLog')
        const listElement = document.createElement('li')
        activityLog.innerHTML = ''
        listElement.innerHTML = `${data.data.firstName} ${data.data.lastName} is ready for surgery. Fingers crossed...`
        activityLog.appendChild(listElement)
      })
  } else {
    // If the div already has a patient, notify the user.
    const activityLog = document.getElementById('activityLog')
    const listElement = document.createElement('li')
    activityLog.innerHTML = ''
    listElement.innerHTML = "There's no room, wait your turn!"
    activityLog.appendChild(listElement)
  }
}

// Function that wipes the records of all patients with 'dead' status.
function cookTheBooks() {
  const activityLog = document.getElementById('activityLog')
  fetch('/api/patient/', {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
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
document
  .getElementById('admit')
  .addEventListener('click', async function (event) {
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
      const diseases = [
        { name: 'Fish Odor Syndrome' },
        { name: 'Dreaming Rage' },
        { name: 'Sheep Scarring' },
        { name: 'Spine Soreness' },
        { name: 'Lime Feet' },
        { name: 'Stiffening Anxiety' },
        { name: 'Numbing Blisters' },
        { name: 'Frenzied Inflammation' },
        { name: 'Cat Inflammation' },
        { name: 'Fading Tumor' },
        { name: 'Undead Stomach' },
        { name: 'Pestilent Deficiency' },
        { name: 'Sage Disease' },
        { name: 'Explosive Anxiety' },
        { name: 'Rabid Syphilis' },
        { name: 'Running Asthma' },
        { name: 'Creeping Delusions' },
        { name: 'Aggressive Infertility' },
        { name: 'Animated Hands' },
        { name: 'Silent Blight' },
        { name: 'Exhausting Bronchitis' },
        { name: 'Marsh Lupus' },
        { name: 'Horse Anemia' },
        { name: 'Zombie Ulcers' },
        { name: 'Shaky Swelling' },
        { name: 'Frozen Dehydration' },
        { name: 'Phantom Aching' },
        { name: 'Weakening Mutation' },
        { name: 'Jumping Euphoria' },
        { name: 'Undead Poisoning' },
        { name: 'Jungle Finger' },
        { name: 'Delirious Paralysis' },
        { name: 'Mouse Hands' },
        { name: 'Wraith Fever' },
        { name: 'Happy Disease' },
        { name: 'Sedated Malaria' },
        { name: 'Grave Rash' },
        { name: 'Ogre Nausea' },
        { name: 'Angry Sores' },
        { name: 'Contagious Sleep Disorder' },
        { name: 'Trivial Tongue' },
        { name: 'Wild Warts' },
        { name: 'Elephant Cannibalism' },
        { name: 'Stimulated Cramps' },
        { name: 'Sniffling Fatigue' },
        { name: 'Pig Irritation' },
        { name: 'Shivering Hallucinations' },
        { name: 'Beer Paranoia' },
        { name: 'Rabid Cholera' },
      ]
      const response = await fetch('https://randomuser.me/api/?nat=ca')

      const patient = await response.json()
      // Define  function that generates a random string
      function seed(length) {
        let result = ''
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          )
        }
        return result
      }
      let profilePhoto
      // Read the gender of generated patient and generate a profile photo
      if (patient.results[0].gender === 'male') {
        profilePhoto = `https://avatars.dicebear.com/api/male/${seed(20)}.svg`
      } else if (patient.results[0].gender === 'female') {
        profilePhoto = `https://avatars.dicebear.com/api/female/${seed(20)}.svg`
      }
      // Get a random health condition from diseases array by generating number.
      const randNum = Math.floor(Math.random() * diseases.length)
      const condition = diseases[randNum]

      // Create the new patient object and return it.
      const newPatient = {
        profilePhoto: profilePhoto,
        firstName: patient.results[0].name.first,
        lastName: patient.results[0].name.last,
        gender: patient.results[0].gender,
        age: patient.results[0].dob.age,
        condition: condition.name,
      }
      fetch('/api/patient', {
        method: 'POST',
        body: JSON.stringify(newPatient),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const activityLog = document.getElementById('activityLog')
          const listElement = document.createElement('li')
          activityLog.innerHTML = ''
          if (data.gender === 'male') {
            listElement.innerHTML = `${data.firstName} ${data.lastName} has arrived. He seems to be suffering from ${data.condition}. Let's fix him up!`
          } else if (data.gender === 'female') {
            listElement.innerHTML = `${data.firstName} ${data.lastName} has arrived. She seems to be suffering from ${data.condition}. Let's fix her up!`
          }

          activityLog.appendChild(listElement)
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
