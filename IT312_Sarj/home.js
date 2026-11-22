// ---------- Website Themes ----------
var themeButton = document.getElementById("theme-toggle");
var siteLogo = document.getElementById("site-logo");
var currentTheme = "light";

// Sections and cards that change color
var sections = ["home-hero-layout", "sarj-reviews", "recommendations-section"];
var cards = ["home-offering-card", "facility-card", "home-recommendation-card"];

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

// Apply the dark or light theme ("" returns the original colors)
function applyTheme(dark) {
    var pageBg = "", sectionBg = "", cardBg = "", text = "";
    var heading = "", paragraph = "", buttonBg = "", buttonText = "";

    if (dark) {
        pageBg = "#1B1814";
        sectionBg = "#26211C";
        cardBg = "#302923";
        text = "#F3E9DC";
        heading = "#D9B38C";
        paragraph = "#E3D6C6";
        buttonBg = "#D9B38C";
        buttonText = "#1B1814";
    }

    // Page and header
    setColors(document.getElementsByTagName("body"), pageBg, text);
    setColors(document.getElementsByTagName("header"), pageBg, text);

    // Sections
    for (var i = 0; i < sections.length; i++) {
        setColors(document.getElementsByClassName(sections[i]), sectionBg, text);
    }

    // Cards
    for (var j = 0; j < cards.length; j++) {
        setColors(document.getElementsByClassName(cards[j]), cardBg, text);
    }

    // Buttons
    setColors(document.getElementsByClassName("main-button"), buttonBg, buttonText);

    // Headings, paragraphs and links
    var main = document.getElementsByTagName("main")[0];
    setTextColor(main.getElementsByTagName("h1"), heading);
    setTextColor(main.getElementsByTagName("h2"), heading);
    setTextColor(main.getElementsByTagName("h3"), heading);
    setTextColor(main.getElementsByTagName("p"), paragraph);
    setTextColor(document.getElementsByClassName("nav-links")[0].getElementsByTagName("a"), text);
    themeButton.style.color = text;

    // Logo and button text
    if (dark) {
        siteLogo.style.filter = "brightness(0) invert(1)";
        themeButton.innerHTML = "☀ الوضع النهاري";
        currentTheme = "dark";
    } else {
        siteLogo.style.filter = "";
        themeButton.innerHTML = "☾ الوضع الليلي";
        currentTheme = "light";
    }
}

// Switch the theme when the button is clicked
function switchTheme() {
    applyTheme(currentTheme == "light");
    localStorage.setItem("sarjTheme", currentTheme);
}

themeButton.onclick = switchTheme;

// Load the saved theme
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
function twoDigits(number) {
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

    var time = twoDigits(hours) + ":" + twoDigits(now.getMinutes()) + ":" +
               twoDigits(now.getSeconds()) + " " + period;

    var date = dayNames[now.getDay()] + "، " + now.getDate() + " " +
               monthNames[now.getMonth()] + " " + now.getFullYear();

    document.getElementById("footer-clock").innerHTML = date + " | " + time;
}

// Update the clock every second
updateClock();
setInterval(updateClock, 1000);
