// Add a New Offering Page

// Get the form elements
var offeringForm = document.getElementById("add-offering-form");
var nameInput = document.getElementById("offering-name");
var imageInput = document.getElementById("offering-image");
var priceInput = document.getElementById("offering-price");
var descriptionInput = document.getElementById("offering-description");
var uploadText = document.getElementsByClassName("image-upload")[0].getElementsByTagName("span")[0];
var imagePreview = document.getElementsByClassName("upload-preview")[0];

// Check if a field is empty
function isEmpty(text) {
    return text.replace(/^\s+|\s+$/g, "") == "";
}

// Remove the spaces at the start and end of a text
function removeSpaces(text) {
    return text.replace(/^\s+|\s+$/g, "");
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
        uploadText.innerHTML = "اختر صورة النشاط (بحد أقصى 1 ميقابايت)";
    }

    showPreview(imageInput, imagePreview);
}

// Check the form when the manager clicks Submit
function addOffering() {

    // Check the empty fields
    if (isEmpty(nameInput.value)) {
        alert("الرجاء إدخال اسم النشاط");
        nameInput.focus();
        return false;
    }

    if (isEmpty(imageInput.value)) {
        alert("الرجاء اختيار صورة النشاط");
        return false;
    }

    if (isEmpty(priceInput.value)) {
        alert("الرجاء إدخال سعر النشاط");
        priceInput.focus();
        return false;
    }

    if (isEmpty(descriptionInput.value)) {
        alert("الرجاء إدخال وصف النشاط");
        descriptionInput.focus();
        return false;
    }

    // The offering name cannot start with a number
    if (nameInput.value.search(/^\s*[0-9٠-٩]/) != -1) {
        alert("اسم النشاط لا يمكن أن يبدأ برقم.");
        nameInput.focus();
        return false;
    }

    // The price must be a number
    var price = parseFloat(priceInput.value);

    if (isNaN(price) || price < 0) {
        alert("الرجاء إدخال سعر صحيح (رقم).");
        priceInput.focus();
        return false;
    }

    // The image must be an image file (check the file extension)
    if (imageInput.value.search(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) == -1) {
        alert("الرجاء اختيار ملف صورة فقط.");
        return false;
    }

    // The image size must be 1 MB or less (Local Storage space is small)
    if (imageInput.files[0].size > 1024 * 1024) {
        alert("حجم الصورة كبير، الرجاء اختيار صورة أقل من 1 ميقابايت.");
        return false;
    }

    // ===== Read the image (FileReader) =====
    var reader = new FileReader();

    reader.onload = function () {

        // Get the previously saved offerings (array of objects)
        var offerings = [];
        var saved = localStorage.getItem("sarjOfferings");

        if (saved != null) {
            offerings = JSON.parse(saved);
        }

        // Create the new offering object
        var newOffering = {
            name: removeSpaces(nameInput.value),
            image: reader.result,
            price: price,
            description: removeSpaces(descriptionInput.value)
        };

        // Add the new offering and save all offerings in Local Storage
        offerings.push(newOffering);

        try {
            localStorage.setItem("sarjOfferings", JSON.stringify(offerings));
        } catch (error) {
            alert("تعذر حفظ النشاط. جرب اختيار صورة أصغر.");
            return;
        }

        // Success message with the name of the new offering
        alert("تمت إضافة النشاط " + newOffering.name + " بنجاح!");

        // Clear the form
        nameInput.value = "";
        imageInput.value = "";
        priceInput.value = "";
        descriptionInput.value = "";
        uploadText.innerHTML = "اختر صورة النشاط (بحد أقصى 1 ميقابايت)";
        imagePreview.innerHTML = "";
    };

    reader.readAsDataURL(imageInput.files[0]);
    // ===== End of reading the image =====

    return false;
}

imageInput.onchange = showImageName;
offeringForm.onsubmit = addOffering;
