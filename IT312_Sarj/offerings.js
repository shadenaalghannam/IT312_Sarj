// Get the offerings list and the sort menu
var offeringList = document.getElementsByClassName("offering-list")[0];
var sortSelect = document.getElementById("sort-offerings");

// Save all offering cards in an array
var offerings = [];
var cards = offeringList.getElementsByClassName("offering-card");

for (var i = 0; i < cards.length; i++) {
    offerings.push(cards[i]);
}

// Get the offering name
function getName(card) {
    var name = card.getElementsByTagName("h2")[0].innerHTML;
    return name.replace(/^\s+|\s+$/g, "");
}

// Get the offering price as a number ("السعر: 300 ريال" -> 300)
function getPrice(card) {
    var priceText = card.getElementsByClassName("offering-price")[0].innerHTML;
    return parseInt(priceText.match(/\d+/)[0]);
}

// Display offerings in the given order
function displayOfferings(list) {
    for (var i = 0; i < list.length; i++) {
        offeringList.appendChild(list[i]);
    }
}

// Shuffle offerings randomly
function shuffleOfferings() {
    var shuffled = offerings.slice();

    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        // Swap the two cards
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    displayOfferings(shuffled);
}

// Sort the cards (bubble sort) by price or name
function sortCards(list, getValue, ascending) {
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = 0; j < list.length - 1 - i; j++) {
            var first = getValue(list[j]);
            var second = getValue(list[j + 1]);

            if ((ascending && first > second) || (!ascending && first < second)) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
}

// Sort offerings based on user selection
function sortOfferings() {
    var choice = sortSelect.value;
    var sorted = offerings.slice();

    if (choice == "price-low") {
        sortCards(sorted, getPrice, true);
    } else if (choice == "price-high") {
        sortCards(sorted, getPrice, false);
    } else if (choice == "name-az") {
        sortCards(sorted, getName, true);
    } else if (choice == "name-za") {
        sortCards(sorted, getName, false);
    } else {
        shuffleOfferings();
        return;
    }

    displayOfferings(sorted);
}

sortSelect.onchange = sortOfferings;

// Random order when the page loads
shuffleOfferings();
