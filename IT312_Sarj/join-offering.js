"use strict";

const form = document.getElementById("join-form");
const offering = document.getElementById("offering");
const instructor = document.getElementById("instructor");
const fullname = document.getElementById("fullname");
const preferredDate = document.getElementById("preferred-date");

const requestsSection = document.getElementById("requests-section");
const requestsBody = document.getElementById("requests-body");


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function updateMinimumDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    preferredDate.min = formatDate(tomorrow);
}


function isFullNameValid(name) {
    const words = name.trim().split(/\s+/u);

    return words.length >= 2 &&
        words.every(word => /^[\p{L}\p{M}]+$/u.test(word));
}


function isFutureDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const validDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    return validDate && value > formatDate(new Date());
}


function displayRequest(offeringName, memberName, date) {
    const row = document.createElement("tr");

    const information = [offeringName, memberName, date];

    information.forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    requestsBody.appendChild(row);
    requestsSection.hidden = false;
}

updateMinimumDate();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateMinimumDate();

    const errors = [];
    let firstInvalidField = null;

    const memberName = fullname.value.trim().replace(/\s+/gu, " ");

    function addError(field, message) {
        errors.push(message);

        if (firstInvalidField === null) {
            firstInvalidField = field;
        }
    }

    if (offering.value === "") {
        addError(offering, "يرجى اختيار النشاط.");
    }

    if (instructor.value === "") {
        addError(instructor, "يرجى اختيار المدرب.");
    }

    if (!isFullNameValid(memberName)) {
        addError(
            fullname,
            "يرجى كتابة الاسم الأول واسم العائلة على الأقل، بحروف فقط وبدون أرقام أو رموز."
        );
    }

    if (!isFutureDate(preferredDate.value)) {
        addError(
            preferredDate,
            "يرجى اختيار تاريخ في المستقبل؛ لا يُقبل تاريخ اليوم أو تاريخ سابق."
        );
    }

    
    if (errors.length > 0) {
        alert("يرجى تصحيح التالي:\n\n" + errors.join("\n"));
        firstInvalidField.focus();
        return;
    }

    
    const offeringName = offering.value;
    const requestDate = preferredDate.value;

    const stayOnPage = confirm(
        "تم إرسال طلب الانضمام بنجاح.\n\n" +
        "للبقاء في الصفحة وعرض طلباتك أو إضافة طلب آخر: اضغط موافق (OK).\n" +
        "للرجوع إلى لوحة العضو: اضغط إلغاء (Cancel)."
    );

    if (stayOnPage) {
        displayRequest(offeringName, memberName, requestDate);

        form.reset();
        updateMinimumDate();

        requestsSection.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    } else {
        window.location.href = "member-dashboard.html";
    }
});


window.addEventListener("pagehide", function () {
    requestsBody.replaceChildren();
    requestsSection.hidden = true;
    form.reset();
});
