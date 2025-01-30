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

courseSelect.addEventListener("change", function() {
    document.getElementById("feedbackForm").style.display = "block";
});

function submitFeedback() {
    let selectedCourse = courseSelect.value;
    let feedback = {
        conceptual: document.getElementById("conceptual").value,
        analytical: document.getElementById("analytical").value,
        individual: document.getElementById("individual").value,
        rigid: document.getElementById("rigid").value,
        quantitative: document.getElementById("quantitative").value
    };
    console.log("Feedback for", selectedCourse, feedback);
    alert("Feedback submitted!");
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