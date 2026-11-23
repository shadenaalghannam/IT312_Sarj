// Manage Activity Leaders and Instructors Page

// Array of objects to store the leaders and instructors
var leaders = [
    { name: "سارة أحمد", email: "sara.ahmed@gmail.com", image: "images/instructor-sara.jpg" },
    { name: "ريم عبدالعزيز", email: "reem.abdulaziz@gmail.com", image: "images/instructor-reem.png" },
    { name: "سعد عبدالله", email: "saad.abdullah@gmail.com", image: "images/instructor-saad.jpg" },
    { name: "هدى محمد", email: "huda.mohammed@gmail.com", image: "images/instructor-huda.jpg" }
];

// Get the HTML elements
var leadersTable = document.getElementById("leaders-body");
var listForm = document.getElementById("leaders-list-form");
var leaderForm = document.getElementById("leader-form");

var imageInput = document.getElementById("leader-image");
var nameInput = document.getElementById("leader-name");
var emailInput = document.getElementById("leader-email");
var educationInput = document.getElementById("leader-education");
var dateInput = document.getElementById("leader-date");
var experienceInput = document.getElementById("leader-experience");
var skillsInput = document.getElementById("leader-skills");
var uploadText = document.getElementsByClassName("leader-image-upload")[0].getElementsByTagName("span")[0];
var imagePreview = document.getElementsByClassName("upload-preview")[0];


// Check if a field is empty
function isEmpty(text) {
    return text.replace(/^\s+|\s+$/g, "") == "";
}

// Remove the spaces at the start and end of a text
function removeSpaces(text) {
    return text.replace(/^\s+|\s+$/g, "");
}

// Add a zero before numbers less than 10 (5 -> 05)
function twoDigits(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

// Keep the dark theme on the new table rows
function refreshTheme() {
    if (currentTheme == "dark") {
        applyTheme(true);
    }
}


// Display the leaders in the table
function displayLeaders() {
    var rows = "";

    if (leaders.length == 0) {
        leadersTable.innerHTML = "<tr><td colspan='4'>لا يوجد قادة أو مدربين حالياً.</td></tr>";
        return;
    }

    for (var i = 0; i < leaders.length; i++) {
        rows += "<tr>" +
            "<td><input type='checkbox' class='leader-checkbox' value='" + i + "'></td>" +
            "<td><img src='" + leaders[i].image + "' alt='صورة " + leaders[i].name + "' class='leader-image'></td>" +
            "<td>" + leaders[i].name + "</td>" +
            "<td>" + leaders[i].email + "</td>" +
            "</tr>";
    }

    leadersTable.innerHTML = rows;
}


// Delete the selected leaders
function deleteLeaders() {
    var checkboxes = document.getElementsByClassName("leader-checkbox");
    var selected = [];

    // Find the selected checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected.push(parseInt(checkboxes[i].value));
        }
    }

    if (selected.length == 0) {
        alert("الرجاء تحديد قائد أو مدرب واحد على الأقل.");
        return false;
    }

    // Confirm the deletion
    if (confirm("هل أنت متأكد من حذف العناصر المحددة؟")) {

        // Delete from the last index to the first
        for (var j = selected.length - 1; j >= 0; j--) {
            leaders.splice(selected[j], 1);
        }

        displayLeaders();
        refreshTheme();

        alert("تم حذف العناصر المحددة بنجاح.");
    }

    return false;
}


// Show a preview of the chosen image inside the upload box
function showPreview(fileInput, previewBox) {
    if (fileInput.value.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) == -1) {
        previewBox.innerHTML = "";
        return;
    }

    var reader = new FileReader();

    reader.onload = function () {
        previewBox.innerHTML = "<img src='" + reader.result + "' alt='معاينة الصورة'>";
    };

    reader.readAsDataURL(fileInput.files[0]);
}

// Show the name and a preview of the chosen image
function showImageName() {
    if (!isEmpty(imageInput.value)) {
        var parts = imageInput.value.split("\\");
        uploadText.innerHTML = parts.pop();
    } else {
        uploadText.innerHTML = "اختر صورة قائد النشاط أو المدرب (بحد أقصى 1 ميقابايت)";
    }

    showPreview(imageInput, imagePreview);
}


// Add a new leader or instructor
function addLeader() {
    var name = removeSpaces(nameInput.value);
    var email = removeSpaces(emailInput.value);

    // Check the empty fields
    if (isEmpty(imageInput.value) || isEmpty(name) || isEmpty(email) ||
        isEmpty(educationInput.value) || isEmpty(dateInput.value) ||
        isEmpty(experienceInput.value) || isEmpty(skillsInput.value)) {
        alert("الرجاء تعبئة جميع الحقول المطلوبة.");
        return false;
    }

    // The name cannot start with a number
    if (name.search(/^[0-9٠-٩]/) != -1) {
        alert("الاسم لا يمكن أن يبدأ برقم.");
        nameInput.focus();
        return false;
    }

    // The email must be in the right format (name@domain.com)
    if (email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == -1) {
        alert("الرجاء إدخال بريد إلكتروني صحيح.");
        emailInput.focus();
        return false;
    }

    // The image must be an image file (check the file extension)
    if (imageInput.value.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) == -1) {
        alert("الرجاء اختيار ملف صورة صحيح.");
        return false;
    }

    // The image size must be 1 MB or less
    if (imageInput.files[0].size > 1024 * 1024) {
        alert("حجم الصورة كبير، الرجاء اختيار صورة أقل من 1 ميقابايت.");
        return false;
    }

    // The date of birth must be in the past
    var now = new Date();
    var today = now.getFullYear() + "-" + twoDigits(now.getMonth() + 1) + "-" + twoDigits(now.getDate());

    if (dateInput.value >= today) {
        alert("تاريخ الميلاد يجب أن يكون في الماضي.");
        dateInput.focus();
        return false;
    }

    // ===== Read the image (FileReader) =====
    var reader = new FileReader();

    reader.onload = function () {

        // Add the new leader object to the array
        leaders.push({ name: name, email: email, image: reader.result });

        // Update the table
        displayLeaders();
        refreshTheme();

        alert("تمت إضافة القائد أو المدرب بنجاح!");

        // Clear the form
        imageInput.value = "";
        nameInput.value = "";
        emailInput.value = "";
        educationInput.value = "";
        dateInput.value = "";
        experienceInput.value = "";
        skillsInput.value = "";
        uploadText.innerHTML = "اختر صورة قائد النشاط أو المدرب (بحد أقصى 1 ميقابايت)";
        imagePreview.innerHTML = "";
    };

    reader.readAsDataURL(imageInput.files[0]);
    // ===== End of reading the image =====

    return false;
}


listForm.onsubmit = deleteLeaders;
imageInput.onchange = showImageName;
leaderForm.onsubmit = addLeader;

// Display the leaders when the page opens
displayLeaders();
