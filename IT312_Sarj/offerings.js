document.addEventListener("DOMContentLoaded", function () {

    const offeringList = document.querySelector(".offering-list");
    const sortSelect = document.getElementById("sort-offerings");

    const offerings = Array.from(
        offeringList.querySelectorAll(".offering-card")
    );

    // Get the offering name
    function getName(card) {
        return card.querySelector("h3").textContent.trim();
    }

    // Get the offering price
    function getPrice(card) {
        const priceText = card.querySelector(".offering-price").textContent;
        return parseFloat(priceText.match(/\d+/)[0]);
    }

    // Display offerings in the selected order
    function displayOfferings(cards) {
        cards.forEach(function (card) {
            offeringList.appendChild(card);
        });
    }

    // Shuffle offerings randomly
    function shuffleOfferings() {
        const shuffled = [...offerings];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        displayOfferings(shuffled);
    }

    // Sort offerings based on user selection
    sortSelect.addEventListener("change", function () {

        const selectedOption = sortSelect.value;
        const sorted = [...offerings];

        switch (selectedOption) {

            case "price-low":
                sorted.sort((a, b) => getPrice(a) - getPrice(b));
                break;

            case "price-high":
                sorted.sort((a, b) => getPrice(b) - getPrice(a));
                break;

            case "name-az":
                sorted.sort((a, b) =>
                    getName(a).localeCompare(getName(b), "ar")
                );
                break;

            case "name-za":
                sorted.sort((a, b) =>
                    getName(b).localeCompare(getName(a), "ar")
                );
                break;

            default:
                shuffleOfferings();
                return;
        }

        displayOfferings(sorted);
    });

    // Random order when the page loads
    shuffleOfferings();

});