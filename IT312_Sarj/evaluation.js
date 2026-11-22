// Get the form elements
var evaluationForm = document.getElementsByClassName("member-form")[0];
var offeringSelect = document.getElementById("completed-offering");
var feedbackInput = document.getElementById("feedback");
var ratingButtons = document.querySelectorAll("input[name='rating']");

// Get the selected rating (0 if no rating is selected)
function getSelectedRating() {
    for (var i = 0; i < ratingButtons.length; i++) {
        if (ratingButtons[i].checked) {
            return parseInt(ratingButtons[i].value);
        }
    }
    return 0;
}

// Check the form when the user clicks Submit
function checkEvaluation() {

    // Check if an offering is selected
    if (offeringSelect.value == "") {
        alert("الرجاء اختيار النشاط المكتمل");
        offeringSelect.focus();
        return false;
    }

    // Check if a rating is selected
    var rating = getSelectedRating();

    if (rating == 0) {
        alert("الرجاء إضافة تقييم للنشاط");
        return false;
    }

    // Check if feedback is provided
    var feedback = feedbackInput.value.replace(/^\s+|\s+$/g, "");

    if (feedback == "") {
        alert("الرجاء كتابة ملاحظاتك");
        feedbackInput.focus();
        return false;
    }

    // Check the rating
    if (rating >= 4) {
        alert("شكراً لك على تقييمك! يسعدنا أن تجربتك كانت رائعة.");
    } else {
        alert("نعتذر أن تجربتك لم تكن بالمستوى المطلوب، وسنعمل على تحسينها.");
    }

    // Return to Member Dashboard (form action)
    return true;
}

evaluationForm.onsubmit = checkEvaluation;
