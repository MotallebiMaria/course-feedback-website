const courses = ["CSCA08", "CSCA20", "CSCA67", "MATA31", "PHYA10", "ASTC25", "BIOA01", "BIOB11", "CHMB41", "PHYA21", "CSCB09", "ASTB23", "PSYB10", "MGHB02", "HISB03", "SOCC11", "CSCC01", "EESC30", "CITC18", "PHLC92"];
const courseSelect = document.getElementById("course");

function populateCourses() {
    courseSelect.innerHTML = "";
    courses.forEach(course => {
        let option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });
}

function filterCourses() {
    let search = document.getElementById("courseSearch").value.toUpperCase();
    let options = courseSelect.options;
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = options[i].value.includes(search) ? "block" : "none";
    }
}

document.getElementById("course").addEventListener("change", function() {
    const selectedCourse = this.value;
    const feedbackForm = document.getElementById("feedbackForm");
    const selectedCourseSpan = document.getElementById("selectedCourse");

    if (selectedCourse) {
        selectedCourseSpan.textContent = selectedCourse;
        feedbackForm.style.display = "block";
    } else {
        feedbackForm.style.display = "none";
    }
});

function submitFeedback() {
    let selectedCourse = courseSelect.value;
    let feedback = {
        course: selectedCourse,
        conceptual: parseInt(document.getElementById("conceptual").value),
        analytical: parseInt(document.getElementById("analytical").value),
        individual: parseInt(document.getElementById("individual").value),
        rigid: parseInt(document.getElementById("rigid").value),
        quantitative: parseInt(document.getElementById("quantitative").value)
    };

    fetch("https://ucqasdyusfebtohttrct.supabase.co/rest/v1/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcWFzZHl1c2ZlYnRvaHR0cmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3Njk5MDUsImV4cCI6MjA1NDM0NTkwNX0.auN5mnO4aIeH4UMlkqlu6hSTLFBAJtrT74Zmk7sAmvU",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcWFzZHl1c2ZlYnRvaHR0cmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3Njk5MDUsImV4cCI6MjA1NDM0NTkwNX0.auN5mnO4aIeH4UMlkqlu6hSTLFBAJtrT74Zmk7sAmvU",
            "Prefer": "return=representation"
        },
        body: JSON.stringify(feedback)
    })
    .then(response => {
        console.log("Response Status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Response Data:", data);
        alert("Feedback submitted successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting feedback.");
    });
}

populateCourses();

function updateSlider(attribute) {
    let slider = document.getElementById(attribute);
    let leftValueDisplay = document.getElementById(attribute + "Value");
    let rightValueDisplay = document.getElementById(attribute === "conceptual" ? "practicalValue" :
                                                     attribute === "analytical" ? "creativeValue" :
                                                     attribute === "individual" ? "collaborativeValue" :
                                                     attribute === "rigid" ? "flexibleValue" :
                                                     "qualitativeValue");

    leftValueDisplay.textContent = (100 - slider.value) + "%";
    rightValueDisplay.textContent = slider.value + "%";
}