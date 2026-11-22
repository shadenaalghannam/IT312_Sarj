
// Manage Activity Leaders and Instructors Page

// Array of Objects to store leaders and instructors
var leaders = [
    {
        name: "سارة أحمد",
        email: "sara.ahmed@gmail.com",
        image: "images/instructor-sara.jpg"
    },
    {
        name: "ريم عبدالعزيز",
        email: "reem.abdulaziz@gmail.com",
        image: "images/instructor-reem.png"
    },
    {
        name: "سعد عبدالله",
        email: "saad.abdullah@gmail.com",
        image: "images/instructor-saad.jpg"
    },
    {
        name: "هدى محمد",
        email: "huda.mohammed@gmail.com",
        image: "images/instructor-huda.jpg"
    }
];

// Get HTML elements
var leadersTable = document.querySelector(".leaders-table tbody");
var listForm = document.querySelector(".leaders-list-form");
var leaderForm = document.querySelector(".leader-form");

var imageInput = document.getElementById("leader-image");
var nameInput = document.getElementById("leader-name");
var emailInput = document.getElementById("leader-email");
var educationInput = document.getElementById("leader-education");
var dateInput = document.getElementById("leader-date");
var experienceInput = document.getElementById("leader-experience");
var skillsInput = document.getElementById("leader-skills");


// Check if a field is empty
function isEmpty(text) {
    return text.replace(/^\s+|\s+$/g, "") == "";
}


// Display leaders in the table
function displayLeaders() {

    leadersTable.innerHTML = "";

    if (leaders.length == 0) {
        var emptyRow = document.createElement("tr");
        var emptyCell = document.createElement("td");

        emptyCell.colSpan = 4;
        emptyCell.textContent = "لا يوجد قادة أو مدربين حالياً.";

        emptyRow.appendChild(emptyCell);
        leadersTable.appendChild(emptyRow);

        return;
    }

    for (var i = 0; i < leaders.length; i++) {

        var row = document.createElement("tr");

        // Checkbox cell
        var checkboxCell = document.createElement("td");
        var checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "leader-checkbox";
        checkbox.value = i;

        checkboxCell.appendChild(checkbox);

        // Image cell
        var imageCell = document.createElement("td");
        var image = document.createElement("img");

        image.src = leaders[i].image;
        image.alt = "صورة " + leaders[i].name;
        image.className = "leader-image";

        imageCell.appendChild(image);

        // Name cell
        var nameCell = document.createElement("td");
        nameCell.textContent = leaders[i].name;

        // Email cell
        var emailCell = document.createElement("td");
        emailCell.textContent = leaders[i].email;

        row.appendChild(checkboxCell);
        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);

        leadersTable.appendChild(row);
    }
}


// Delete selected leaders
listForm.onsubmit = function(event) {

    event.preventDefault();

    var checkboxes = document.querySelectorAll(".leader-checkbox");
    var selected = [];

    // Find selected checkboxes
    for (var i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {
            selected.push(parseInt(checkboxes[i].value));
        }
    }

    if (selected.length == 0) {
        alert("الرجاء تحديد قائد أو مدرب واحد على الأقل.");
        return false;
    }

    // Confirm deletion
    if (confirm("هل أنت متأكد من حذف العناصر المحددة؟")) {

        // Delete from the last index to the first
        for (var j = selected.length - 1; j >= 0; j--) {
            leaders.splice(selected[j], 1);
        }

        displayLeaders();

        alert("تم حذف العناصر المحددة بنجاح.");
    }

    return false;
};


// Change image upload text
imageInput.onchange = function() {

    if (imageInput.files.length > 0) {
        document.querySelector(".leader-image-upload span").textContent =
            imageInput.files[0].name;
    }
};


// Add a new leader or instructor
leaderForm.onsubmit = function(event) {

    event.preventDefault();

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();

    // Check required fields
    if (
        imageInput.files.length == 0 ||
        isEmpty(name) ||
        isEmpty(email) ||
        isEmpty(educationInput.value) ||
        isEmpty(dateInput.value) ||
        isEmpty(experienceInput.value) ||
        isEmpty(skillsInput.value)
    ) {
        alert("الرجاء تعبئة جميع الحقول المطلوبة.");
        return false;
    }

    // Validate name
    if (/^[0-9٠-٩]/.test(name)) {
        alert("الاسم لا يمكن أن يبدأ برقم.");
        nameInput.focus();
        return false;
    }

    // Validate email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("الرجاء إدخال بريد إلكتروني صحيح.");
        emailInput.focus();
        return false;
    }

    // Validate image
    var selectedImage = imageInput.files[0];

    if (selectedImage.type.indexOf("image/") != 0) {
        alert("الرجاء اختيار ملف صورة صحيح.");
        return false;
    }

    // Validate date of birth
    var birthDate = new Date(dateInput.value);
    var today = new Date();

    if (birthDate >= today) {
        alert("تاريخ الميلاد يجب أن يكون في الماضي.");
        dateInput.focus();
        return false;
    }

    // Read image
    var reader = new FileReader();

    reader.onload = function() {

        // Create a new leader object
        var newLeader = {
            name: name,
            email: email,
            image: reader.result,
            education: educationInput.value.trim(),
            date: dateInput.value,
            experience: experienceInput.value.trim(),
            skills: skillsInput.value.trim()
        };

        // Add object to the array
        leaders.push(newLeader);

        // Update the table
        displayLeaders();

        alert("تمت إضافة القائد أو المدرب بنجاح!");

        // Clear the form
        leaderForm.reset();

        document.querySelector(".leader-image-upload span").textContent =
            "اختر صورة قائد النشاط أو المدرب";
    };

    reader.onerror = function() {
        alert("حدث خطأ أثناء قراءة الصورة، حاول مرة أخرى.");
    };

    reader.readAsDataURL(selectedImage);

    return false;
};


// Display the initial leaders
displayLeaders();
