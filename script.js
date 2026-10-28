const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

const patientDetails = [
  { name: "Emily Williams", gender: "Female", age: 18 },
  { name: "Ryan Johnson", gender: "Male", age: 45 },
  { name: "Brandon Mitchell", gender: "Male", age: 36 },
  { name: "Jessica Taylor", gender: "Female", age: 28 },
  { name: "Samantha Johnson", gender: "Female", age: 56 },
  { name: "Ashley Martinez", gender: "Female", age: 54 },
  { name: "Olivia Brown", gender: "Female", age: 32 },
  { name: "Tyler Davis", gender: "Male", age: 19 },
  { name: "Kevin Anderson", gender: "Male", age: 30 },
  { name: "Dylan Thompson", gender: "Male", age: 36 },
  { name: "Nathan Evans", gender: "Male", age: 58 },
  { name: "Mike Nolan", gender: "Male", age: 31 },
];

let bloodPressureChart = null;

async function loadDashboard() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa("coalition:skills-test"),
      },
    });

    if (!response.ok) {
      throw new Error("API request failed: " + response.status);
    }

    const patients = await response.json();

    // Build the patient list
    renderPatients(patients);

    // Find Jessica's information for the main dashboard
    const jessica = patients.find(
      (patient) => patient.name === "Jessica Taylor",
    );

    if (!jessica) {
      throw new Error("Jessica Taylor was not found in the API data.");
    }

    renderProfile(jessica);
    renderVitals(jessica);
    renderDiagnosis(jessica);
    renderLabResults(jessica);
    renderBloodPressureChart(jessica);
  } catch (error) {
    console.error("Dashboard error:", error);

    const list = document.getElementById("patients-list");

    if (list) {
      list.innerHTML =
        '<p class="loading">Could not load patients. Check your API connection.</p>';
    }
  }
}

// LEFT COLUMN
function renderPatients(patients) {
  const patientsList = document.getElementById("patients-list");
  patientsList.innerHTML = "";

  patientDetails.forEach((details) => {
    const apiPatient = patients.find(
      (patient) => patient.name === details.name,
    );

    if (!apiPatient) {
      console.warn("Patient not found in API:", details.name);
      return;
    }

    const row = document.createElement("div");
    row.className = "patient-item";

    if (details.name === "Jessica Taylor") {
      row.classList.add("active");
    }

    const avatar = document.createElement("img");
    avatar.className = "patient-avatar";
    avatar.alt = details.name;
    avatar.src = apiPatient.profile_picture || "";

    const info = document.createElement("div");
    info.className = "patient-info";

    const name = document.createElement("h3");
    name.textContent = details.name;

    const description = document.createElement("p");
    description.textContent = `${details.gender}, ${details.age}`;

    info.append(name, description);
    row.append(avatar, info);
    patientsList.appendChild(row);
  });
}

// RIGHT COLUMN: PROFILE
function renderProfile(patient) {
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "--";
  };

  setText("profile-name", patient.name);
  setText("profile-description", `${patient.gender}, ${patient.age} years old`);
  setText("profile-gender", patient.gender);
  setText("date-of-birth", patient.date_of_birth);
  setText("phone-number", patient.phone_number);
  setText("emergency-contact", patient.emergency_contact);
  setText("insurance-provider", patient.insurance_type);

  const avatar = document.getElementById("profile-avatar");

  if (avatar && patient.profile_picture) {
    avatar.src = patient.profile_picture;
  }
}

// CENTER COLUMN: VITAL SIGNS
function renderVitals(patient) {
  const history = patient.diagnosis_history || [];

  // The API usually lists the latest history first.
  const latest = history[0];

  if (!latest) return;

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value ?? "--";
  };

  const respiratory = latest.respiratory_rate;
  const temperature = latest.temperature;
  const heart = latest.heart_rate;
  const bloodPressure = latest.blood_pressure;

  setText("respiratory-value", respiratory?.value ?? "--");

  setText("temperature-value", temperature?.value ?? "--");

  setText("heart-value", heart?.value ?? "--");

  setText(
    "systolic-value",
    bloodPressure?.systolic?.value ?? bloodPressure?.systolic ?? "--",
  );

  setText(
    "diastolic-value",
    bloodPressure?.diastolic?.value ?? bloodPressure?.diastolic ?? "--",
  );

  setText("respiratory-status", respiratory?.levels || "Latest reading");

  setText("temperature-status", temperature?.levels || "Latest reading");

  setText("heart-status", heart?.levels || "Latest reading");
}

// CENTER COLUMN: BLOOD PRESSURE CHART
function renderBloodPressureChart(patient) {
  const history = [...(patient.diagnosis_history || [])].reverse();

  const labels = history.map((item) => {
    const month = item.month || "";
    const year = item.year || "";
    return `${month} ${year}`.trim();
  });

  const systolic = history.map((item) =>
    Number(
      item.blood_pressure?.systolic?.value ??
        item.blood_pressure?.systolic ??
        0,
    ),
  );

  const diastolic = history.map((item) =>
    Number(
      item.blood_pressure?.diastolic?.value ??
        item.blood_pressure?.diastolic ??
        0,
    ),
  );

  const canvas = document.getElementById("bloodPressureChart");

  if (!canvas || labels.length === 0) return;

  if (bloodPressureChart) {
    bloodPressureChart.destroy();
  }

  bloodPressureChart = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolic,
          borderColor: "#e66fd2",
          backgroundColor: "#e66fd2",
          borderWidth: 2,
          pointRadius: 4,
          tension: 0.35,
        },
        {
          label: "Diastolic",
          data: diastolic,
          borderColor: "#7765db",
          backgroundColor: "#7765db",
          borderWidth: 2,
          pointRadius: 4,
          tension: 0.35,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 14,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: 40,
          suggestedMax: 200,
          title: {
            display: true,
            text: "mmHg",
          },
          grid: {
            color: "#e8e5f0",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            maxRotation: 45,
            minRotation: 0,
          },
        },
      },
    },
  });
}

// CENTER COLUMN: DIAGNOSTIC LIST
function renderDiagnosis(patient) {
  const list = document.getElementById("diagnostic-list");
  list.innerHTML = "";

  const diagnoses = patient.diagnostic_list || [];

  if (diagnoses.length === 0) {
    list.innerHTML =
      '<tr><td colspan="3">No diagnostic information available.</td></tr>';
    return;
  }

  diagnoses.forEach((diagnosis) => {
    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.textContent = diagnosis.name || "--";

    const description = document.createElement("td");
    description.textContent = diagnosis.description || "--";

    const status = document.createElement("td");
    status.textContent = diagnosis.status || "--";

    row.append(name, description, status);
    list.appendChild(row);
  });
}

// RIGHT COLUMN: LAB RESULTS
function renderLabResults(patient) {
  const list = document.getElementById("lab-results");
  list.innerHTML = "";

  const results = patient.lab_results || [];

  if (results.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No lab results available.";
    list.appendChild(item);
    return;
  }

  results.forEach((result) => {
    const item = document.createElement("li");

    const name = document.createElement("span");
    name.textContent =
      typeof result === "string" ? result : result.name || "--";

    const download = document.createElement("span");
    download.className = "lab-download";
    download.textContent = "↓";
    download.setAttribute("aria-label", "Download unavailable");

    item.append(name, download);
    list.appendChild(item);
  });
}

// Start the dashboard
loadDashboard();
