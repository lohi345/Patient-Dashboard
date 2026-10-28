# 🏥 Tech.Care — Patient Data Dashboard

## 📌 Overview

Tech.Care is a patient data dashboard built using HTML, CSS, and JavaScript. It displays patient information, health statistics, diagnostic details, lab results, and a blood pressure chart using data from an API.

## ✨ Features

- 👥 Patient list displayed in the sidebar
- 🧑‍⚕️ Jessica Taylor’s profile and personal details
- ❤️ Health metrics, including blood pressure, temperature, and heart rate
- 📈 Blood pressure history chart using Chart.js
- 🩺 Diagnostic information and lab results
- 🔗 Patient data loaded dynamically from an API
- 🎨 Dashboard styled to match the provided Adobe XD design

## 🛠️ Technologies Used

- 🌐 **HTML5** — Page structure
- 🎨 **CSS3** — Styling and layout
- ⚙️ **JavaScript** — Data handling and dashboard functionality
- 📊 **Chart.js** — Blood pressure chart
- 🔌 **Fetch API** — Retrieving patient data from the server

## 📁 Project Structure

```text
TechCare/
├── index.html       # 🏠 Main webpage
├── style.css        # 🎨 Styles and layout
├── script.js        # ⚙️ API and dashboard logic
├── README.md        # 📖 Project documentation
└── asserts/         # 🖼️ Images and icons
```

## 🔌 API Integration

The dashboard retrieves patient information from the Coalition Technologies API.

- **Method:** GET
- **Authentication:** Basic Authentication
- **API URL:** `https://fedskillstest.coalitiontechnologies.workers.dev`
- Username: coalition
- Password: skills-test

The dashboard selects Jessica Taylor’s information and uses it to populate her profile, health metrics, diagnostic list, lab results, and blood pressure chart.

## 🚀 How to Run the Project

1. 💻 Open the project folder in Visual Studio Code.
2. ▶️ Open the terminal in VS Code.
3. ⌨️ Run the following command:

   ```bash
   python -m http.server 8000
   ```

4. 🌍 Open your browser and visit `http://localhost:8000`.
5. ✅ Make sure you have an internet connection so the API can load the patient data.

## 🎨 Design Reference

The interface was developed with reference to the provided Adobe XD design.

🔗 https://xd.adobe.com/view/3f9ab587-7536-4db8-a7dd-64d474e10867-6ac9/?hints=off

## 📝 Notes

- 🎯 The dashboard focuses on Jessica Taylor’s medical information.
- 🔄 Patient data is retrieved dynamically from the API.
- 🧩 The project uses separate HTML, CSS, and JavaScript files for easy maintenance.

## 👩‍💻 Author

**Tech.Care Patient Data Dashboard Project**

---

💙 Built with HTML, CSS, and JavaScript.
