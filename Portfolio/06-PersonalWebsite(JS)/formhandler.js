document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.onsubmit = function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get values from the form fields
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("start-time").value;
        const endTime = document.getElementById("end-time").value;
        const activity = document.getElementById("activity").value;
        const place = document.getElementById("place").value;
        const type = document.getElementById("type").value;
        const notes = document.getElementById("notes").value;
        const isBusy = document.getElementById("busy").checked; // Check if busy is checked

        // Create a new row for the schedule table
        const newRow = document.createElement("tr");

        // Create cells for each piece of information
        const busyCell = document.createElement("td");
        busyCell.innerHTML = `<img src="./images/${isBusy ? 'busy' : 'free'}.png" alt="${isBusy ? 'Ocupado' : 'Libre'}" width="50px"/>`;
        newRow.appendChild(busyCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = date;
        newRow.appendChild(dateCell);

        const startCell = document.createElement("td");
        startCell.textContent = startTime;
        newRow.appendChild(startCell);

        const endCell = document.createElement("td");
        endCell.textContent = endTime;
        newRow.appendChild(endCell);

        const activityCell = document.createElement("td");
        activityCell.textContent = activity;
        newRow.appendChild(activityCell);

        const placeCell = document.createElement("td");
        placeCell.textContent = place;
        newRow.appendChild(placeCell);

        const typeCell = document.createElement("td");
        typeCell.textContent = type;
        newRow.appendChild(typeCell);

        const notesCell = document.createElement("td");
        notesCell.textContent = notes;
        newRow.appendChild(notesCell);

        // Append the new row to the schedule table
        const scheduleTableBody = document.getElementById("schedule-body");
        scheduleTableBody.appendChild(newRow);

        form.reset();
    };
});