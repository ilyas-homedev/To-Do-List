import { saveTaskToLocalStorage, deleteTaskFromLocalStorage } from './local-storage.js';

const $defaultTaskContainer = document.querySelector('[data-type="default-task-container"]');
const $defaultDescription = $defaultTaskContainer.querySelector('[data-type="default-task-input"]');
const $defaultData = $defaultTaskContainer.querySelector('[type="date"]');
const $defaultTime = $defaultTaskContainer.querySelector('[type="time"]');
const $title = document.querySelector('[data-type="folderTitle"]');
const $prompt = document.querySelector('.task-fill-prompt');
const $list = document.querySelector('[data-type="task-list"]');

// Adds empty inputs for creating tasks
export function addEmptyInputField(folderName) {
    $list.innerHTML = "";
    $defaultTaskContainer.classList.add("open-default-task-container");
    $title.textContent = folderName;
    $prompt.style.display = "block";
}

export function addToTaskList(taskObj) {
    const li = document.createElement("li");
    li.id = taskObj.id;
    li.dataset.type = "task";
    li.classList.add("task");

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    let currentDateString;
    if (currentMonth.toString().length === 1) {
        currentDateString = `${currentYear}-0${currentMonth}-${currentDay}`;
    } else {
        currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;
    }

    if (currentDateString === taskObj.date) {
        li.classList.add('todays-task');
    }
    if (taskObj.isDone) {
        li.classList.add('task-done');
    }

    li.innerHTML = `<button data-type="checkbox" class="task-buttons checkbox"><i class="fas fa-check"></i></button>
                    <input type="text" placeholder="Task" class="task-description saved-task" value="${taskObj.description}" disabled>
                    <input type="date" class="task-date saved-task" value="${taskObj.date}" disabled>
                    <input type="time" class="task-time saved-task" value="${taskObj.time}" disabled>   
                    <button data-type="delete" class="task-buttons delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>
                    <span class="today-label">today</span>`;

    $list.appendChild(li);
}

export function saveTask(folderName, li) {
    const description = li.querySelector('.task-description');
    const date = li.querySelector('.task-date');
    const time = li.querySelector('.task-time');
    
    const randomNumber = Math.floor(Math.random() * 10000);
    const id = `${folderName}-task-${randomNumber}`;

    const newTask = {
        id: id,
        description: description.value,
        date: handleDate(date.value),
        time: time.value,
        isDone: false,
    }

    saveTaskToLocalStorage(newTask);
    addToTaskList(newTask);
}

export function deleteTask(li) {
    li.remove();
    deleteTaskFromLocalStorage(li);
}

export function taskDone(li) {
    if (li.classList.contains('task-done')) {
        li.classList.remove('task-done');
        console.log("Task not completed.");
        return false;
    } else {
        li.classList.add('task-done');
        console.log("Task done!");
        return true;
    }
}

export function handleDate(value) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    let currentDateString;
    let dateOfTask;

    if (currentMonth.toString().length === 1) {
        currentDateString = `${currentYear}-0${currentMonth}-${currentDay}`;
    } else {
        currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;
    }

    if (value) {
        dateOfTask = value;
    } else {
        dateOfTask = currentDateString;
    }
    return dateOfTask
}

export function clearDefaultInputFields() {
    $defaultDescription.value = "";
    $defaultData.value = "";
    $defaultTime.value = "";
}