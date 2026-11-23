// Club Manager Dashboard Page

// Get the table body
var offeringsBody = document.getElementById("offerings-body");

// Display the offerings that the manager added (from Local Storage)
function displayNewOfferings() {
    var saved = localStorage.getItem("sarjOfferings");

    // No offerings were added yet
    if (saved == null) {
        return;
    }

    // Read the array of offerings
    var offerings = JSON.parse(saved);
    var rows = "";

    for (var i = 0; i < offerings.length; i++) {
        rows += "<tr>" +
            "<td><img src='" + offerings[i].image + "' alt='" + offerings[i].name + "' width='70' height='60'></td>" +
            "<td>" + offerings[i].name + "</td>" +
            "<td>" + offerings[i].description + "</td>" +
            "<td>" + offerings[i].price + ' <span class="riyal">&#x20C1;</span></td>' +
            "<td>نشاط مضاف حديثًا</td>" +
            "</tr>";
    }

    // Add the new rows after the current offerings
    offeringsBody.innerHTML += rows;
}

// Display the offerings when the page loads
displayNewOfferings();
