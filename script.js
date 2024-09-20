// Select Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterTasks = document.getElementById('filter-tasks');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
addTaskBtn.addEventListener('click', function(e) {
    e.preventDefault();  // Prevent form submit default behavior
    addTask();
});
taskList.addEventListener('click', manageTask);
filterTasks.addEventListener('change', filterTaskList);

// Functions

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTaskToLocalStorage(taskText);
        taskInput.value = ''; // Clear input after adding task
    } else {
        alert("Please enter a task.");
    }
}

// Create Task Element
function createTaskElement(taskText) {
    const taskItem = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.innerText = taskText;
    taskItem.appendChild(taskContent);

    // Mark as Done Button
    const doneBtn = document.createElement('button');
    doneBtn.innerText = 'Done';
    doneBtn.classList.add('done-btn');
    taskItem.appendChild(doneBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

// Manage Task (Mark as Done or Delete)
function manageTask(event) {
    const item = event.target;
    const task = item.parentElement;

    // Mark Task as Done
    if (item.classList.contains('done-btn')) {
        task.classList.toggle('completed');
        updateTaskInLocalStorage(task);
    }

    // Delete Task
    if (item.classList.contains('delete-btn')) {
        removeTaskFromLocalStorage(task);
        task.remove();
    }
}

// Filter Tasks
function filterTaskList() {
    const tasks = taskList.childNodes;
    tasks.forEach(function(task) {
        switch (filterTasks.value) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}

// Local Storage Functions

// Save Task to Local Storage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from Local Storage
function getTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        const taskItem = createTaskElement(task.text);
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
    return tasks;
}

// Update Task in Local Storage
function updateTaskInLocalStorage(taskElement) {
    let tasks = getTasksFromLocalStorage();
    const taskText = taskElement.firstChild.innerText;
    tasks.forEach(function(task) {
        if (task.text === taskText) {
            task.completed = taskElement.classList.contains('completed');
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskElement) {
    let tasks = getTasksFromLocalStorage();
    const taskText = taskElement.firstChild.innerText;
    tasks = tasks.filter(function(task) {
        return task.text !== taskText;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
