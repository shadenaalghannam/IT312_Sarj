// About Us Page: "Join Our Team" form

var teamForm = document.getElementById("join-team-form");
var photoInput = document.getElementById("applicant-photo");
var nameInput = document.getElementById("applicant-name");
var emailInput = document.getElementById("applicant-email");
var educationInput = document.getElementById("applicant-education");
var dobInput = document.getElementById("applicant-dob");
var expertiseInput = document.getElementById("applicant-expertise");
var skillsInput = document.getElementById("applicant-skills");

// All the inputs of the form (array)
var allInputs = [photoInput, nameInput, emailInput, educationInput,
                 dobInput, expertiseInput, skillsInput];

// Check if a field is empty or has spaces only
function isEmpty(text) {
    return text.search(/\S/) == -1;
}

// Show the name of the chosen photo inside the upload box
photoInput.onchange = function () {
    var uploadText = document.querySelector(".photo-upload .upload-text");
    if (!isEmpty(photoInput.value)) {
        uploadText.innerHTML = photoInput.value.split("\\").pop();
    } else {
        uploadText.innerHTML = "اختر صورتك الشخصية";
    }
};

teamForm.onsubmit = function () {

    var name = nameInput.value;

    // No empty fields
    for (var i = 0; i < allInputs.length; i++) {
        if (isEmpty(allInputs[i].value)) {
            alert("الرجاء تعبئة جميع الحقول.");
            allInputs[i].focus();
            return false;
        }
    }

    // name cannot start with a number
    if (name.search(/^\s*[0-9٠-٩]/) != -1) {
        alert("الاسم لا يمكن أن يبدأ برقم.");
        nameInput.focus();
        return false;
    }

    // photo must be an image file (check the file extension)
    if (photoInput.value.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) == -1) {
        alert("الرجاء اختيار ملف صورة فقط (jpg, png, gif...).");
        return false;
    }

    // year of birth must be 2008 or earlier
    var year = parseInt(dobInput.value.split("-")[0]);
    if (year > 2008) {
        alert("يجب أن تكون سنة الميلاد 2008 أو قبل.");
        dobInput.focus();
        return false;
    }

    // confirmation message with the sender's name
    alert("شكراً " + name + "، تم استلام طلب انضمامك لفريق سَرْج بنجاح!");

    // Clear the form
    for (var j = 0; j < allInputs.length; j++) {
        allInputs[j].value = "";
    }
    document.querySelector(".photo-upload .upload-text").innerHTML = "اختر صورتك الشخصية";

    // return false stops the page from reloading
    return false;
};
