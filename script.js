document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addTaskBtn").addEventListener("click", function() {
        var taskInput = document.getElementById("taskInput").value.trim();
        if (taskInput !== "") {
            promptMoveTask(taskInput);
            document.getElementById("taskInput").value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    function promptMoveTask(taskName) {
        var moveTo = prompt("Enter 'progress' to move to In Progress, 'done' to move to Done, or leave blank to keep in To Do:");
        if (moveTo === "progress") {
            addTaskToProgress(taskName);
            removeTask(column, taskName);
        } else if (moveTo === "done") {
            addTaskToDone(taskName);
            removeTask(column, taskName);
        } else if (moveTo === "") {
            addTask("todo", taskName);
        } else {
            alert("Invalid input. Task will remain in To Do list.");
        }
    }
    function removeTask(column, taskName) {
        var taskList = document.getElementById(column + "-list");
        var tasks = taskList.getElementsByClassName("card");
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].textContent === taskName) {
                tasks[i].remove();
                break;
            }
        }
    }
    function addTask(column, taskName) {
        var taskList = document.getElementById(column + "-list");

        var task = document.createElement("div");
        task.className = "card";
        task.textContent = taskName;
        task.draggable = true;
        task.addEventListener("click", function() {
            promptMoveTask(taskName);
        });

        taskList.appendChild(task);
    }

    function addTaskToProgress(taskName) {
        addTask("inprogress", taskName);
    }

    function addTaskToDone(taskName) {
        addTask("done", taskName);
    }

    var columns = document.querySelectorAll(".column-content");
    columns.forEach(function(column) {
        column.addEventListener("drop", drop);
        column.addEventListener("dragover", allowDrop);
    });

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
});
