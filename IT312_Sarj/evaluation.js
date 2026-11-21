
document.addEventListener("DOMContentLoaded", function () {

    const evaluationForm = document.querySelector(".member-form");
    const offeringSelect = document.getElementById("completed-offering");
    const feedbackInput = document.getElementById("feedback");

    evaluationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Check if an offering is selected
        if (offeringSelect.value === "") {
            alert("الرجاء اختيار النشاط المكتمل");
            offeringSelect.focus();
            return;
        }

        // Check if a rating is selected
        const selectedRating = document.querySelector(
            'input[name="rating"]:checked'
        );

        if (!selectedRating) {
            alert("الرجاء إضافة تقييم للنشاط");
            return;
        }

        // Check if feedback is provided
        if (feedbackInput.value.trim() === "") {
            alert("الرجاء كتابة ملاحظاتك");
            feedbackInput.focus();
            return;
        }

        // Check the rating
        const rating = Number(selectedRating.value);

        if (rating >= 4) {
            alert("شكراً لك على تقييمك! يسعدنا أن تجربتك كانت رائعة.");
        } else {
            alert("نعتذر أن تجربتك لم تكن بالمستوى المطلوب، وسنعمل على تحسينها.");
        }

        // Return to Member Dashboard
        window.location.href = "member-dashboard.html";

    });

});
