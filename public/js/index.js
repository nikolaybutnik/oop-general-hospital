let logButton = document.getElementById('log')
logButton.addEventListener('click', renderPatientsTable)

function renderPatientsTable() {
  fetch('/api/patient')
    .then((response) => response.json())
    .then((patients) => {
      let patientTableBody = document.querySelector('#patientsTable tbody')
      patientTableBody.innerHTML = ''
      let patientRow,
        patientProfilePic,
        patientFirstName,
        patientLastName,
        patientGender,
        patientAge,
        patientCondition,
        patientDischargeButton,
        dischargeButton
      for (let patient of patients) {
        if (patient['healthStatus'] != 'sick') {
          continue
        }
        patientRow = document.createElement('tr')

        patientProfilePic = document.createElement('td')
        profilePic = document.createElement('img')
        profilePic.setAttribute('src', patient['profilePhoto'])
        patientProfilePic.appendChild(profilePic)
        patientRow.appendChild(patientProfilePic)

        patientFirstName = document.createElement('td')
        patientFirstName.innerHTML = patient['firstName']
        patientRow.appendChild(patientFirstName)

        patientLastName = document.createElement('td')
        patientLastName.innerHTML = patient['lastName']
        patientRow.appendChild(patientLastName)

        patientGender = document.createElement('td')
        patientGender.innerHTML = patient['gender']
        patientRow.appendChild(patientGender)

        patientAge = document.createElement('td')
        patientAge.innerHTML = patient['age']
        patientRow.appendChild(patientAge)

        patientCondition = document.createElement('td')
        patientCondition.innerHTML = patient['condition']
        patientRow.appendChild(patientCondition)

        patientDischargeButton = document.createElement('td')
        dischargeButton = document.createElement('button')
        dischargeButton.innerHTML = 'Discharge'
        dischargeButton.setAttribute('data-patientId', patient['id'])
        dischargeButton.addEventListener('click', dischargePatient)
        patientDischargeButton.appendChild(dischargeButton)
        patientRow.appendChild(patientDischargeButton)

        patientTableBody.appendChild(patientRow)
      }
    })
}
function dischargePatient(event) {
  const patientId = event.target.getAttribute('data-patientid')
  fetch('/api/patient/' + patientId, { method: 'PUT' })
    .then((response) => response.json())
    .then((patient) => {
      renderPatientsTable()
    })
}
