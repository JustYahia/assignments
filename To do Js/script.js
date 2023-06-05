let taskNumber = 1;

function add() {
    let input = document.getElementById("task").value;
    let priority = document.getElementById("priority").value;

    if (input !== "" && priority > 0 && priority <= 5 && priority !== "") {
        let table = document.getElementById("tbody");
        let row = table.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerText = taskNumber;

        let cell2 = row.insertCell(1);
        cell2.innerText = input;

        let cell3 = row.insertCell(2);

        let button = document.createElement("button");
        button.innerText = "Delete";
        cell3.appendChild(button);

        button.addEventListener("click", function () {
            let currentRow = this.parentNode.parentNode;
            currentRow.parentNode.removeChild(currentRow);
        });

        let cell4 = row.insertCell(3);
        cell4.innerText = priority;

        let cell5 = row.insertCell(4);

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        cell5.appendChild(editButton);

        editButton.addEventListener("click", function () {
            let editCell = this.parentNode;


            editCell.removeChild(editButton);


            let taskInput = document.createElement("input");
            taskInput.type = "text";
            taskInput.value = input;

            let priorityInput = document.createElement("input");
            priorityInput.type = "number";
            priorityInput.value = priority;


            let saveButton = document.createElement("button");
            saveButton.innerText = "Save";

            let cancelButton = document.createElement("button");
            cancelButton.innerText = "Cancel";


            editCell.appendChild(taskInput);
            editCell.appendChild(priorityInput);
            editCell.appendChild(saveButton);
            editCell.appendChild(cancelButton);


            saveButton.addEventListener("click", function () {

                let newTask = taskInput.value;
                let newPriority = priorityInput.value;


                if (newTask !== "" && newPriority > 0 && newPriority <= 5 && newPriority !== "") {

                    cell2.innerText = newTask;
                    cell4.innerText = newPriority;


                    editCell.removeChild(taskInput);
                    editCell.removeChild(priorityInput);
                    editCell.removeChild(saveButton);
                    editCell.removeChild(cancelButton);


                    editCell.appendChild(editButton);


                    input = newTask;
                    priority = newPriority;
                } else {
                    alert("Please enter valid data for editing.");
                }
            });


            cancelButton.addEventListener("click", function () {

                editCell.removeChild(taskInput);
                editCell.removeChild(priorityInput);
                editCell.removeChild(saveButton);
                editCell.removeChild(cancelButton);


                editCell.appendChild(editButton);
            });
        });

        taskNumber++;
    } else if (priority <= 0 || priority > 5 || typeof priority === "string") {
        alert("Enter priority in the range 1 to 5.");
    } else {
        alert("Please enter valid data.");
    }
}

function sortPriority() {
    let table = document.getElementById("tbody");
    let rows = Array.from(table.getElementsByTagName("tr"));

    rows.sort(function (row1, row2) {
        let priority1 = parseInt(row1.cells[3].innerText);
        let priority2 = parseInt(row2.cells[3].innerText);
        return priority1 - priority2;
    });

    for (let i = 0; i < rows.length; i++) {
        table.appendChild(rows[i]);
    }
}

