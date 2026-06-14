let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const index = tasks.indexOf(task);

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index) {
    let newText = prompt("Edit Task", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

function updateTime() {
    const now = new Date();
    document.getElementById("datetime").innerHTML =
    now.toLocaleString();
}

setInterval(updateTime, 1000);
updateTime();

displayTasks();
document.getElementById("taskCount").innerText =
`Total Tasks: ${tasks.length}`;
