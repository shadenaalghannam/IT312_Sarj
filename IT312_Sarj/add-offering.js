// Add a New Offering Page

// Get the form elements
var offeringForm = document.getElementById("add-offering-form");
var nameInput = document.getElementById("offering-name");
var imageInput = document.getElementById("offering-image");
var priceInput = document.getElementById("offering-price");
var descriptionInput = document.getElementById("offering-description");

// Array to store all offerings
var offerings = [];

// Check if a field is empty
function isEmpty(text) {
    return text.replace(/^\s+|\s+$/g, "") == "";
}

// Check the form when the manager clicks Submit
offeringForm.onsubmit = function (event) {

    event.preventDefault();

    // Check if there are empty fields
    if (isEmpty(nameInput.value)) {
        alert("الرجاء إدخال اسم النشاط");
        nameInput.focus();
        return false;
    }

    if (imageInput.files.length == 0) {
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

    // Offering name cannot start with numbers
    if (/^\s*[0-9٠-٩]/.test(nameInput.value)) {
        alert("اسم النشاط لا يمكن أن يبدأ برقم.");
        nameInput.focus();
        return false;
    }

    // Check if the price is a valid number
    var price = Number(priceInput.value);

    if (isNaN(price) || price < 0) {
        alert("الرجاء إدخال سعر صحيح.");
        priceInput.focus();
        return false;
    }

    // Check if the selected file is an image
    var selectedFile = imageInput.files[0];

    if (selectedFile.type.indexOf("image/") != 0) {
        alert("الرجاء اختيار ملف صورة فقط.");
        return false;
    }

    // Read the image file
    var reader = new FileReader();

    reader.onload = function () {

        // Get previously saved offerings
        offerings = JSON.parse(localStorage.getItem("sarjOfferings")) || [];

        // Create a new offering object
        var newOffering = {
            name: nameInput.value.replace(/^\s+|\s+$/g, ""),
            image: reader.result,
            price: price,
            description: descriptionInput.value.replace(/^\s+|\s+$/g, "")
        };

        // Add the new offering to the array
        offerings.push(newOffering);

        // Save all offerings in Local Storage
        try {
            localStorage.setItem("sarjOfferings", JSON.stringify(offerings));
        } catch (error) {
            alert("تعذر حفظ النشاط. جرب اختيار صورة أصغر.");
            return;
        }

        // Success message
        alert("تمت إضافة النشاط " + newOffering.name + " بنجاح!");

        // Clear the form
        offeringForm.reset();

        // Reset the image upload text
        document.querySelector(".image-upload span").innerHTML =
            "اختر صورة النشاط";
    };

    reader.onerror = function () {
        alert("حدث خطأ أثناء قراءة الصورة.");
    };

    reader.readAsDataURL(selectedFile);

    return false;
};