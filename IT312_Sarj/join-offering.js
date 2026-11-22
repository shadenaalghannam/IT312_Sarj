// Get the form elements
var joinForm = document.getElementById("join-form");
var offeringList = document.getElementById("offering");
var instructorList = document.getElementById("instructor");
var nameInput = document.getElementById("fullname");
var dateInput = document.getElementById("preferred-date");
var requestsSection = document.getElementById("requests-section");
var requestsBody = document.getElementById("requests-body");

// Check the full name: two words or more, letters only (no numbers or ? ! @)
function isFullName(name) {
    var pattern = /^[a-zA-Zء-ي]+( [a-zA-Zء-ي]+)+$/;
    return name.search(pattern) != -1;
}

// Add a zero before numbers less than 10 (5 -> 05)
function twoDigits(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

// Check that the date is in the future (compare it with today as "yyyy-mm-dd")
function isFutureDate(dateValue) {
    var now = new Date();
    var today = now.getFullYear() + "-" + twoDigits(now.getMonth() + 1) + "-" + twoDigits(now.getDate());
    return dateValue > today;
}

// Change the date format ("2026-12-20" -> "20/12/2026")
function formatDate(dateValue) {
    var parts = dateValue.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

// Display the request in the table
function addRequestRow(offeringName, memberName, dateValue) {
    requestsBody.innerHTML += "<tr><td>" + offeringName + "</td><td>" + memberName +
                              "</td><td>" + formatDate(dateValue) + "</td></tr>";
    requestsSection.style.display = "block";
}

// Check the form when the user clicks Submit
function checkRequest() {
    var errors = "";
    // Remove extra spaces from the name
    var memberName = nameInput.value.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");

    // Check the offering
    if (offeringList.value == "") {
        errors += "- يرجى اختيار النشاط.\n";
    }

    // Check the instructor
    if (instructorList.value == "") {
        errors += "- يرجى اختيار المدرب.\n";
    }

    // Check the name
    if (memberName == "") {
        errors += "- يرجى كتابة الاسم الكامل.\n";
    } else if (!isFullName(memberName)) {
        errors += "- يجب كتابة الاسم الكامل (الاسم الأول واسم العائلة) بحروف فقط، بدون أرقام أو رموز مثل ? ! @\n";
    }

    // Check the date
    if (dateInput.value == "") {
        errors += "- يرجى اختيار التاريخ المفضل.\n";
    } else if (!isFutureDate(dateInput.value)) {
        errors += "- يجب أن يكون التاريخ المفضل في المستقبل.\n";
    }

    // Show what is missing and stop
    if (errors != "") {
        alert("لم يتم إرسال الطلب، يرجى تصحيح التالي:\n\n" + errors);
        return false;
    }

    // Ask the member to stay or go back
    var stayOnPage = confirm("تم إرسال طلب الانضمام بنجاح ✔\n\n" +
                             "هل تريد البقاء في هذه الصفحة؟\n" +
                             "- اضغط OK للبقاء وعرض طلباتك أو إضافة طلب آخر.\n" +
                             "- اضغط Cancel للعودة إلى لوحة العضو.");

    if (stayOnPage) {
        addRequestRow(offeringList.value, memberName, dateInput.value);

        // Keep the dark theme on the new row
        if (currentTheme == "dark") {
            applyTheme(true);
        }

        // Scroll down smoothly to the requests table
        requestsSection.scrollIntoView();

        // Clear the form for a new request
        offeringList.value = "";
        instructorList.value = "";
        nameInput.value = "";
        dateInput.value = "";
        document.getElementById("notifications").checked = false;

        return false;
    }

    // Return to Member Dashboard (form action)
    return true;
}

joinForm.onsubmit = checkRequest;
