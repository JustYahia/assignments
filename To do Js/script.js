let taskNumber = 1;

function add() {
    let input = document.getElementById("task").value;
    if (input !== "") {
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


        taskNumber++;
    }
    else {
        alert("please enter valid data");
    }
}
