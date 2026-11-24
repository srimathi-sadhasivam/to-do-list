

// ========================================
// 1. SELECT HTML ELEMENTS
// ========================================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");


// ========================================
// 2. APPLICATION DATA
// ========================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// ========================================
// 3. SAVE TASKS TO LOCAL STORAGE
// ========================================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// ========================================
// 4. DISPLAY TASKS
// ========================================

function renderTasks() {

    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "completed") {
            return task.completed === true;
        }

        if (currentFilter === "pending") {
            return task.completed === false;
        }

        return true;

    });


    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.dataset.id = task.id;

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;


        // Task text
        const span = document.createElement("span");

        span.textContent = task.title;

        if (task.completed) {
            span.classList.add("completed");
        }


        // Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.type = "button";


        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}


// ========================================
// 5. ADD NEW TASK
// ========================================

function addTask() {

    const title = taskInput.value.trim();

    if (title === "") {

        alert("Please enter a task!");

        return;

    }


    const newTask = {

        id: Date.now().toString(),

        title: title,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";

}


// ========================================
// 6. ADD BUTTON EVENT
// ========================================

addTaskBtn.addEventListener("click", addTask);


// Press Enter to add task
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ========================================
// 7. COMPLETE AND DELETE TASKS
// ========================================

taskList.addEventListener("change", function(event) {

    if (event.target.type === "checkbox") {

        const li = event.target.closest("li");

        const taskId = li.dataset.id;

        const task = tasks.find(function(item) {

            return item.id === taskId;

        });

        if (task) {

            task.completed = event.target.checked;

            saveTasks();

            renderTasks();

        }

    }

});


taskList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const li = event.target.closest("li");

        const taskId = li.dataset.id;

        tasks = tasks.filter(function(task) {

            return task.id !== taskId;

        });

        saveTasks();

        renderTasks();

    }

});


// ========================================
// 8. FILTER TASKS
// ========================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;


        // Remove active class from all buttons
        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Activate selected filter
        button.classList.add("active");


        renderTasks();

    });

});


// ========================================
// 9. LOAD SAVED TASKS
// ========================================

function loadTasks() {

    renderTasks();

}


// ========================================
// 10. INITIALIZE APPLICATION
// ========================================

loadTasks();
