let taskNumber = 1;

function add() {
    let input = document.getElementById("task").value;
    let prioirty = document.getElementById("priority").value;
    if (input !== "" && prioirty > 0 && prioirty <= 5 && prioirty != "") {
        let table = document.getElementById("tbody");
        let row = table.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerText = taskNumber;

        let cell2 = row.insertCell(1);
        cell2.innerText = input;

        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell4.innerText = prioirty;
        let button = document.createElement("button");
        button.innerText = "Delete";
        cell3.appendChild(button);

        let sort_btn = document.getElementById("sort_priority").value;


        button.addEventListener("click", function () {

            let currentRow = this.parentNode.parentNode;
            currentRow.parentNode.removeChild(currentRow);
        });


        taskNumber++;
    }
    else if (prioirty <= 0 || prioirty > 5 || typeof prioirty == "String") {
        alert("enter priority in range 1 to 5 ");
    }
    else {
        alert("please enter valid data");
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
