class TaskManager {
  constructor() {
    this.taskNumber = 1;
    this.taskNames = [];
  }

  addTask() {
    const input = document.getElementById("task").value;
    const priority = document.getElementById("priority").value;

    if (input !== "" && priority > 0 && priority <= 5) {
      const table = document.getElementById("tbody");

      if (this.taskNames.includes(input)) {
        alert("Task already exists!");
        return;
      }

      const row = table.insertRow(-1);

      const cell1 = row.insertCell(0);
      cell1.innerText = this.taskNumber;

      const cell2 = row.insertCell(1);
      cell2.innerText = input;
      this.taskNames.push(input);

      const cell3 = row.insertCell(2);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `checkbox-${this.taskNumber}`;
      cell3.appendChild(checkbox);

      const button = document.createElement("button");
      button.innerText = "Delete";
      cell3.appendChild(button);

      button.addEventListener("click", () => {
        const currentRow = button.parentNode.parentNode;
        const taskName = currentRow.cells[1].innerText;
        const index = this.taskNames.indexOf(taskName);
        if (index !== -1) {
          this.taskNames.splice(index, 1);
        }
        currentRow.parentNode.removeChild(currentRow);
      });

      const cell4 = row.insertCell(3);
      cell4.innerText = priority;

      const cell5 = row.insertCell(4);

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      cell5.appendChild(editButton);

      editButton.addEventListener("click", () => {
        this.editTask(row, input, priority, editButton);
      });

      const cell6 = row.insertCell(5);

      const doneButton = document.createElement("button");
      doneButton.innerText = "Done";
      cell6.appendChild(doneButton);

      doneButton.addEventListener("click", () => {
        this.toggleTaskDone(row);
      });

      this.taskNumber++;
    } else if (input === "") {
      alert("Please enter valid data.");
    } else if (
      priority <= 0 ||
      priority > 5 ||
      typeof priority === "string" ||
      priority !== ""
    ) {
      alert("Enter priority in the range 1 to 5.");
    }
  }

  editTask(row, input, priority, editButton) {
    editButton.remove();

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = input;

    const priorityInput = document.createElement("input");
    priorityInput.type = "number";
    priorityInput.value = priority;

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.style.marginLeft = "2px";

    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.style.marginLeft = "2px";

    const editCell = row.cells[1];
    editCell.innerHTML = "";
    editCell.appendChild(taskInput);

    const priorityCell = row.cells[3];
    priorityCell.innerHTML = "";
    priorityCell.appendChild(priorityInput);

    const actionsCell = row.cells[4];
    actionsCell.innerHTML = "";
    actionsCell.appendChild(saveButton);
    actionsCell.appendChild(cancelButton);

    saveButton.addEventListener("click", () => {
      const newTask = taskInput.value;
      const newPriority = priorityInput.value;

      if (
        newTask !== "" &&
        newPriority > 0 &&
        newPriority <= 5 &&
        newPriority !== ""
      ) {
        row.cells[1].innerText = newTask;
        row.cells[3].innerText = newPriority;

        actionsCell.innerHTML = "";
        actionsCell.appendChild(editButton);

        input = newTask;
        priority = newPriority;
      } else {
        alert("Please enter valid data for editing.");
      }
    });

    cancelButton.addEventListener("click", () => {
      actionsCell.innerHTML = "";
      actionsCell.appendChild(editButton);
      row.cells[1].innerText = input;
      row.cells[3].innerText = priority;
    });
  }

  toggleTaskDone(row) {
    const doneButton = row.cells[5].querySelector("button");
    const taskNumberCell = row.cells[0];
    const taskNameCell = row.cells[1];
    const priorityCell = row.cells[3];

    if (taskNameCell.style.textDecoration === "line-through") {
      taskNumberCell.style.textDecoration = "none";
      taskNameCell.style.textDecoration = "none";
      priorityCell.style.textDecoration = "none";
      taskNameCell.style.color = "black";
      priorityCell.style.color = "black";
      doneButton.style.backgroundColor = "";
    } else {
      taskNumberCell.style.textDecoration = "line-through";
      taskNameCell.style.textDecoration = "line-through";
      priorityCell.style.textDecoration = "line-through";
      taskNameCell.style.color = "red";
      priorityCell.style.color = "red";
      doneButton.style.backgroundColor = "red";
    }
}


  sortPriority() {
    const table = document.getElementById("tbody");
    const rows = Array.from(table.getElementsByTagName("tr"));

    rows.sort((row1, row2) => {
      const priority1 = parseInt(row1.cells[3].innerText);
      const priority2 = parseInt(row2.cells[3].innerText);
      return priority1 - priority2;
    });

    for (let i = 0; i < rows.length; i++) {
      table.appendChild(rows[i]);
    }
  }

  deleteChecked() {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      const currentRow = checkbox.parentNode.parentNode;
      const taskName = currentRow.cells[1].innerText;
      const index = this.taskNames.indexOf(taskName);
      if (index !== -1) {
        this.taskNames.splice(index, 1);
      }
      currentRow.parentNode.removeChild(currentRow);
    });
  }
}

const taskManager = new TaskManager();

function add(event) {
  event.preventDefault();
  taskManager.addTask();
}

function sortPriority() {
  taskManager.sortPriority();
}

function deleteChecked() {
  taskManager.deleteChecked();
}


document.getElementById("btn").addEventListener("click", add);
document.getElementById("sort_priority").addEventListener("click", sortPriority);
document
  .getElementById("delete_checked")
  .addEventListener("click", deleteChecked);
