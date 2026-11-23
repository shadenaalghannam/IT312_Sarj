// About Us Page: "Join Our Team" form

// Get the form elements
var teamForm = document.getElementById("join-team-form");
var photoInput = document.getElementById("applicant-photo");
var nameInput = document.getElementById("applicant-name");
var emailInput = document.getElementById("applicant-email");
var educationInput = document.getElementById("applicant-education");
var dobInput = document.getElementById("applicant-dob");
var expertiseInput = document.getElementById("applicant-expertise");
var skillsInput = document.getElementById("applicant-skills");
var uploadText = document.getElementsByClassName("upload-text")[0];
var photoPreview = document.getElementsByClassName("upload-preview")[0];

// All the inputs of the form (array)
var allInputs = [photoInput, nameInput, emailInput, educationInput,
                 dobInput, expertiseInput, skillsInput];

// Check if a field is empty or has spaces only
function isEmpty(text) {
    return text.search(/\S/) == -1;
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

// Show the name and a preview of the chosen photo
function showPhotoName() {
    if (!isEmpty(photoInput.value)) {
        var parts = photoInput.value.split("\\");
        uploadText.innerHTML = parts.pop();
    } else {
        uploadText.innerHTML = "اختر صورتك الشخصية";
    }

    showPreview(photoInput, photoPreview);
}

// Check the form when the user clicks Submit
function checkTeamForm() {
    var name = nameInput.value;

    // No empty fields
    for (var i = 0; i < allInputs.length; i++) {
        if (isEmpty(allInputs[i].value)) {
            alert("الرجاء تعبئة جميع الحقول.");
            allInputs[i].focus();
            return false;
        }
    }

    // The name cannot start with a number
    if (name.search(/^\s*[0-9٠-٩]/) != -1) {
        alert("الاسم لا يمكن أن يبدأ برقم.");
        nameInput.focus();
        return false;
    }

    // The email must be in the right format (name@domain.com)
    if (emailInput.value.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == -1) {
        alert("الرجاء إدخال بريد إلكتروني صحيح.");
        emailInput.focus();
        return false;
    }

    // The photo must be an image file (check the file extension)
    if (photoInput.value.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) == -1) {
        alert("الرجاء اختيار ملف صورة فقط (jpg, png, gif...).");
        return false;
    }

    // The year of birth must be 2008 or earlier
    var year = parseInt(dobInput.value.split("-")[0]);

    if (year > 2008) {
        alert("يجب أن تكون سنة الميلاد 2008 أو قبل.");
        dobInput.focus();
        return false;
    }

    // Confirmation message with the sender's name
    alert("شكراً " + name + "، تم استلام طلب انضمامك لفريق سَرْج بنجاح!");

    // Clear the form
    for (var j = 0; j < allInputs.length; j++) {
        allInputs[j].value = "";
    }
    uploadText.innerHTML = "اختر صورتك الشخصية";
    photoPreview.innerHTML = "";

    // Stop the page from reloading
    return false;
}

photoInput.onchange = showPhotoName;
teamForm.onsubmit = checkTeamForm;
