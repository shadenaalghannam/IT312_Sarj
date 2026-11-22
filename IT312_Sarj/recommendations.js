// Get the cards grid and the sort menu
var cardsGrid = document.getElementById("recommend-grid");
var sortSelect = document.getElementById("sort-rating");
var resultText = document.getElementById("recommend-count");

// Save all cards in an array
var allCards = [];
var articles = cardsGrid.getElementsByTagName("article");

for (var i = 0; i < articles.length; i++) {
    allCards.push(articles[i]);
}

// Get the rating number of a card
function getRating(card) {
    var ratingNumber = card.getElementsByClassName("rating-number")[0];
    return parseInt(ratingNumber.innerHTML);
}

// Sort the cards by rating (bubble sort)
function sortCards(list, ascending) {
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = 0; j < list.length - 1 - i; j++) {
            var first = getRating(list[j]);
            var second = getRating(list[j + 1]);

            if ((ascending && first > second) || (!ascending && first < second)) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
}

// Display the cards based on user selection
function showCards() {
    var choice = sortSelect.value;
    var cards = allCards.slice();
    var shown = 0;

    if (choice == "high") {
        sortCards(cards, false);
    } else if (choice == "low") {
        sortCards(cards, true);
    }

    for (var i = 0; i < cards.length; i++) {
        // Move the card to its new place
        cardsGrid.appendChild(cards[i]);

        // "top" shows the 5-star cards only
        if (choice == "top" && getRating(cards[i]) < 5) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "block";
            shown++;
        }
    }

    resultText.innerHTML = "عدد النتائج: <strong>" + shown + "</strong>";
}

sortSelect.onchange = showCards;
