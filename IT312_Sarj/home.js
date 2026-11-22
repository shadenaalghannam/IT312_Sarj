// ---------- Website Themes ----------
// The button is on the Home Page, and the saved theme is applied on every page
var themeButton = document.getElementById("theme-toggle");
var currentTheme = "light";

// Light or dark colors for each group of elements
var sectionClasses = ["page-intro", "details-intro", "home-hero-layout", "sarj-reviews",
                      "recommendations-section", "details-features", "learning-list",
                      "fact-icon", "icon-box", "offering-image-placeholder", "instructor-name-cell",
                      "check-row", "sarj-quote", "instructor-quote", "leader-form",
                      "photo-upload", "image-upload", "leader-image-upload"];

var cardClasses = ["offering-card", "home-offering-card", "facility-card", "team-card",
                   "home-recommendation-card", "store-card", "youtube-card", "member-panel",
                   "leaders-panel", "join-form", "leaders-table", "instructor-table"];

var buttonClasses = ["main-button", "store-button", "youtube-button", "details-button",
                     "join-submit", "leader-submit"];

// Elements that keep their own colors (status, stars)
var keepClasses = ["status", "rating-star", "store-rating", "youtube-rating",
                   "sarj-review-stars", "delete-button"];

// Change the background and text color of elements
function setColors(elements, background, text) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = background;
        elements[i].style.color = text;
    }
}

// Change the text color of elements
function setTextColor(elements, text) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = text;
    }
}

// Apply the dark or light theme ("" returns the original colors of style.css)
function applyTheme(dark) {
    var pageBg = "", sectionBg = "", cardBg = "", text = "";
    var heading = "", buttonBg = "", buttonText = "";

    if (dark) {
        pageBg = "#1B1814";
        sectionBg = "#26211C";
        cardBg = "#302923";
        text = "#F3E9DC";
        heading = "#D9B38C";
        buttonBg = "#D9B38C";
        buttonText = "#1B1814";
    }

    var i, j;

    // The content of the page: <main> and the page introduction
    var parts = [];
    var mains = document.getElementsByTagName("main");
    var intros = document.getElementsByClassName("page-intro");

    for (i = 0; i < mains.length; i++) {
        parts.push(mains[i]);
    }
    for (i = 0; i < intros.length; i++) {
        parts.push(intros[i]);
    }

    // Page and header
    setColors(document.getElementsByTagName("body"), pageBg, text);
    setColors(document.getElementsByTagName("header"), pageBg, text);
    setTextColor(document.getElementsByClassName("nav-links")[0].getElementsByTagName("a"), text);

    // All text inside the page
    for (i = 0; i < parts.length; i++) {
        setTextColor(parts[i].getElementsByTagName("*"), text);
    }

    // Sections
    for (i = 0; i < sectionClasses.length; i++) {
        setColors(document.getElementsByClassName(sectionClasses[i]), sectionBg, text);
    }

    // Cards (no shadow in the dark theme)
    for (i = 0; i < cardClasses.length; i++) {
        var cards = document.getElementsByClassName(cardClasses[i]);
        setColors(cards, cardBg, text);

        for (j = 0; j < cards.length; j++) {
            if (dark) {
                cards[j].style.boxShadow = "none";
            } else {
                cards[j].style.boxShadow = "";
            }
        }
    }

    // Tables, form fields, headings and links
    for (i = 0; i < parts.length; i++) {
        setColors(parts[i].getElementsByTagName("th"), sectionBg, heading);
        setColors(parts[i].getElementsByTagName("td"), cardBg, text);
        setColors(parts[i].getElementsByTagName("form"), cardBg, text);
        setColors(parts[i].getElementsByTagName("input"), cardBg, text);
        setColors(parts[i].getElementsByTagName("select"), cardBg, text);
        setColors(parts[i].getElementsByTagName("textarea"), cardBg, text);

        setTextColor(parts[i].getElementsByTagName("h1"), heading);
        setTextColor(parts[i].getElementsByTagName("h2"), heading);
        setTextColor(parts[i].getElementsByTagName("h3"), heading);
        setTextColor(parts[i].getElementsByTagName("a"), heading);
    }

    // Dashboard links and rating choices
    var links = document.getElementsByClassName("dashboard-links");
    for (i = 0; i < links.length; i++) {
        var linkCards = links[i].getElementsByTagName("a");
        setColors(linkCards, cardBg, text);

        for (j = 0; j < linkCards.length; j++) {
            if (dark) {
                linkCards[j].style.boxShadow = "none";
            } else {
                linkCards[j].style.boxShadow = "";
            }
        }
    }

    var ratings = document.getElementsByClassName("rating-row");
    for (i = 0; i < ratings.length; i++) {
        setColors(ratings[i].getElementsByTagName("label"), sectionBg, text);
    }

    setTextColor(document.getElementsByClassName("offering-price"), heading);

    // Buttons
    for (i = 0; i < buttonClasses.length; i++) {
        setColors(document.getElementsByClassName(buttonClasses[i]), buttonBg, buttonText);
    }

    // Keep the original colors of status labels and stars
    for (i = 0; i < keepClasses.length; i++) {
        setTextColor(document.getElementsByClassName(keepClasses[i]), "");
    }

    // Logo and theme button
    var logo = document.getElementsByClassName("site-logo")[0];

    if (dark) {
        logo.style.filter = "brightness(0) invert(1)";
        currentTheme = "dark";
    } else {
        logo.style.filter = "";
        currentTheme = "light";
    }

    if (themeButton != null) {
        themeButton.style.color = text;

        if (dark) {
            themeButton.innerHTML = "☀ الوضع النهاري";
        } else {
            themeButton.innerHTML = "☾ الوضع الليلي";
        }
    }
}

// Switch the theme when the button is clicked (Home Page)
function switchTheme() {
    applyTheme(currentTheme == "light");
    localStorage.setItem("sarjTheme", currentTheme);
}

if (themeButton != null) {
    themeButton.onclick = switchTheme;
}

// Load the saved theme on every page
if (localStorage.getItem("sarjTheme") == "dark") {
    applyTheme(true);
}


// ---------- Back to Top ----------
var topButton = document.getElementById("back-to-top");

// Show the button when the user scrolls down
function showTopButton() {
    if (document.documentElement.scrollTop > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

// Return to the top of the page
function goToTop() {
    document.documentElement.scrollTop = 0;
}

window.onscroll = showTopButton;
topButton.onclick = goToTop;


// ---------- Real-Time Clock ----------
var dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
var monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

// Add a zero before numbers less than 10 (5 -> 05)
function clockDigits(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

// Show the date and time in the footer
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var period = "ص";

    if (hours >= 12) {
        period = "م";
    }

    // 12-hour format
    hours = hours % 12;
    if (hours == 0) {
        hours = 12;
    }

    var time = clockDigits(hours) + ":" + clockDigits(now.getMinutes()) + ":" +
               clockDigits(now.getSeconds()) + " " + period;

    var date = dayNames[now.getDay()] + "، " + now.getDate() + " " +
               monthNames[now.getMonth()] + " " + now.getFullYear();

    document.getElementById("footer-clock").innerHTML = date + " | " + time;
}

// Update the clock every second
updateClock();
setInterval(updateClock, 1000);
