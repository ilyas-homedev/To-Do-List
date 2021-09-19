import { saveTaskToLocalStorage, deleteTaskFromLocalStorage } from './local-storage.js';

const $defaultTaskContainer = document.querySelector('[data-type="default-task-container"]');
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

    if (taskObj.isForToday) {
        li.classList.add('todays-task');
    }
    if (taskObj.isDone) {
        li.classList.add('task-done');
    }

    li.innerHTML = `<button data-type="checkbox" class="checkbox"><i class="fas fa-check"></i></button>
                    <input type="text" placeholder="Task" class="task-description saved-task" value="${taskObj.description}" disabled>
                    <input type="date" class="task-date saved-task" value="${taskObj.date}" disabled>
                    <input type="time" class="task-time saved-task" value="${taskObj.time}" disabled>   
                    <button data-type="delete" class="delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>`;

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
        date: date.value,
        time: time.value,
        isDone: false,
        isForToday: false,
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function checkDateAndTime(task) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    let currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;
    let currentTimeString = '00:00';

    let taskDatePlug = '';
    if (currentMonth.toString().length === 1) {
        taskDatePlug = `${currentYear}-0${currentMonth}-${currentDay}`;
    } else {
        taskDatePlug = `${currentYear}-${currentMonth}-${currentDay}`;
    }

    let date = '';
    let time = '';
    

    if (task.date) {
        date = task.date;
    } else {
        date = currentDateString;
        task.date = taskDatePlug;
    }
    if (task.time) {
        time = task.time;
    } else {
        time = currentTimeString
    }

    const monthArr = date.split('-')[1].split('');
    let monthIndex = null;
    if (monthArr[0] === '0') {
        monthIndex = +monthArr[1];
    } else {
        monthIndex = +monthArr.join('');
    }

    const day = date.split('-')[2];
    const year = date.split('-')[0];
    
    const dateString = `${day} ${months[monthIndex]} ${year} ${time}:00 GMT`;
    const shortDateString = `${year}-${monthIndex}-${day}`;

    const dateAndTime = Date.parse(dateString);
    // console.log(currentDate.getTime());

    if (shortDateString === currentDateString) {
        return 'todays-task';
    }

    return '';
}
