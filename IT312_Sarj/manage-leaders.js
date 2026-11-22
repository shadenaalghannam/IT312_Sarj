
// Manage Activity Leaders and Instructors Page

// The list of leaders and instructors (array of objects)
var leaders = [
    { name: "سارة أحمد", email: "sara.ahmed@gmail.com", image: "images/instructor-sara.jpg" },
    { name: "ريم عبدالعزيز", email: "reem.abdulaziz@gmail.com", image: "images/instructor-reem.png" },
    { name: "سعد عبدالله", email: "saad.abdullah@gmail.com", image: "images/instructor-saad.jpg" },
    { name: "هدى محمد", email: "huda.mohammed@gmail.com", image: "images/instructor-huda.jpg" }
];

var leadersBody = document.getElementById("leaders-body");
var listForm = document.getElementById("leaders-list-form");
var leaderForm = document.getElementById("leader-form");

// Check if a field is empty or has spaces only
function isEmpty(text) {
    return text.search(/\S/) == -1;
}

// Check that a text is not numbers only
function isOnlyNumbers(text) {
    return text.search(/^[0-9٠-٩\s]+$/) != -1;
}

// Display all leaders in the table with a checkbox for each one
function showLeaders() {
    var rows = "";

    if (leaders.length == 0) {
        rows = "<tr><td colspan='4'>لا يوجد قادة أنشطة أو مدربين حالياً.</td></tr>";
    }

    for (var i = 0; i < leaders.length; i++) {
        rows += "<tr>" +
                "<td><input type='checkbox' class='leader-checkbox' value='" + i + "'" +
                " aria-label='تحديد " + leaders[i].name + "'></td>" +
                "<td><img src='" + leaders[i].image + "' alt='صورة " + leaders[i].name +
                "' class='leader-image'></td>" +
                "<td>" + leaders[i].name + "</td>" +
                "<td>" + leaders[i].email + "</td>" +
                "</tr>";
    }

    leadersBody.innerHTML = rows;
}

// Delete selected people
listForm.onsubmit = function () {

    var boxes = document.getElementsByClassName("leader-checkbox");
    var selected = [];

    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            selected.push(parseInt(boxes[i].value));
        }
    }

    // Nobody selected
    if (selected.length == 0) {
        alert("الرجاء تحديد شخص واحد على الأقل للحذف.");
        return false;
    }

    // Ask the manager to confirm
    if (confirm("هل أنت متأكد من حذف " + selected.length + " من قادة الأنشطة/المدربين؟")) {
        // Delete from the end so the indexes stay correct
        for (var j = selected.length - 1; j >= 0; j--) {
            leaders.splice(selected[j], 1);
        }
        showLeaders();
    }
    return false;
};

// Add a new leader
var imageInput = document.getElementById("leader-image");
var nameInput = document.getElementById("leader-name");
var emailInput = document.getElementById("leader-email");
var educationInput = document.getElementById("leader-education");
var dateInput = document.getElementById("leader-date");
var experienceInput = document.getElementById("leader-experience");
var skillsInput = document.getElementById("leader-skills");

// Show the name of the chosen image inside the upload box
imageInput.onchange = function () {
    var uploadText = document.querySelector(".leader-image-upload span");
    if (!isEmpty(imageInput.value)) {
        uploadText.innerHTML = imageInput.value.split("\\").pop();
    } else {
        uploadText.innerHTML = "اختر صورة قائد النشاط أو المدرب";
    }
};

leaderForm.onsubmit = function () {

    var name = nameInput.value;
    var email = emailInput.value;

    // Check for empty fields and tell the user which ones
    var missing = [];
    if (isEmpty(imageInput.value)) missing.push("الصورة");
    if (isEmpty(name)) missing.push("الاسم");
    if (isEmpty(email)) missing.push("البريد الإلكتروني");
    if (isEmpty(educationInput.value)) missing.push("التعليم");
    if (isEmpty(dateInput.value)) missing.push("تاريخ الميلاد");
    if (isEmpty(experienceInput.value)) missing.push("مجال الخبرة");
    if (isEmpty(skillsInput.value)) missing.push("المهارات");

    if (missing.length > 0) {
        alert("الرجاء تعبئة الحقول التالية:\n- " + missing.join("\n- "));
        return false;
    }

    // Check that every input matches its type
    // Name: letters and spaces only 
    if (name.search(/^[a-zA-Zء-ي ]+$/) == -1) {
        alert("الاسم يجب أن يحتوي على حروف فقط بدون أرقام أو رموز.");
        nameInput.focus();
        return false;
    }

    // Email: name@domain.com
    if (email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == -1) {
        alert("الرجاء إدخال بريد إلكتروني صحيح، مثال: name@gmail.com");
        emailInput.focus();
        return false;
    }

    // Education, expertise and skills: text, cannot be only numbers
    if (isOnlyNumbers(educationInput.value) ||
        isOnlyNumbers(experienceInput.value) ||
        isOnlyNumbers(skillsInput.value)) {
        alert("حقول التعليم والخبرة والمهارات يجب أن تكون نصاً وليست أرقاماً.");
        return false;
    }

    // Image: must be an image file 
    if (imageInput.value.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) == -1) {
        alert("الرجاء اختيار ملف صورة فقط.");
        return false;
    }

    // Date of birth: year must be 2008 or earlier (same rule as About Us)
    var year = parseInt(dateInput.value.split("-")[0]);
    if (year > 2008) {
        alert("يجب أن تكون سنة الميلاد 2008 أو قبل.");
        dateInput.focus();
        return false;
    }

    // The form is valid: add the new person to the list
    leaders.push({
        name: name,
        email: email,
        // Show the chosen photo (the browser gives a temporary link to it)
        image: URL.createObjectURL(imageInput.files[0])
    });
    showLeaders();

    alert("تمت إضافة " + name + " إلى القائمة بنجاح.");
    var formInputs = [imageInput, nameInput, emailInput, educationInput,
                      dateInput, experienceInput, skillsInput];
    for (var k = 0; k < formInputs.length; k++) {
        formInputs[k].value = "";
    }
    document.querySelector(".leader-image-upload span").innerHTML = "اختر صورة قائد النشاط أو المدرب";
    return false;
};

// Show the list when the page opens
showLeaders();
