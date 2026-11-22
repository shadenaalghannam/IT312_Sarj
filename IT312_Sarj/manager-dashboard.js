// Club Manager Dashboard Page

// Get the table body
var offeringsBody = document.getElementById("offerings-body");

// Get saved offerings from Local Storage
var offerings = [];

// Read the saved offerings
function getOfferings() {

    var savedOfferings = localStorage.getItem("sarjOfferings");

    if (savedOfferings != null) {
        offerings = JSON.parse(savedOfferings);
    }

    return offerings;
}


// Create a table cell
function createCell(text) {

    var cell = document.createElement("td");

    cell.innerHTML = text;

    return cell;
}


// Display all newly added offerings
function displayOfferings() {

    // Get all saved offerings
    var savedOfferings = getOfferings();

    // Loop through the offerings array
    for (var i = 0; i < savedOfferings.length; i++) {

        // Get the current offering
        var offering = savedOfferings[i];

        // Create a new table row
        var row = document.createElement("tr");


        // Create the image cell
        var imageCell = document.createElement("td");

        var image = document.createElement("img");

        image.src = offering.image;
        image.alt = offering.name;
        image.width = 70;
        image.height = 60;

        imageCell.appendChild(image);


        // Add the image to the row
        row.appendChild(imageCell);


        // Add the offering name
        row.appendChild(createCell(offering.name));


        // Add the offering description
        row.appendChild(createCell(offering.description));


        // Add the offering price
        row.appendChild(createCell(offering.price + " ريال"));


        // Create the action cell
        var actionCell = document.createElement("td");

        actionCell.innerHTML = "نشاط مضاف حديثًا";

        row.appendChild(actionCell);


        // Add the new row to the table
        offeringsBody.appendChild(row);

    }
}


// Display offerings when the page loads
displayOfferings();