import { addToFoldersList } from './create-folder.js';

const $list = document.querySelector('[data-type="task-list"]');

export function saveFolderToLocalStorage(folderName) {
    let data;
    if (localStorage.getItem('data') === null) {
        data = [[], []];
    } else {
        data = JSON.parse(localStorage.getItem('data'));
    }
    let folders = data[0];
    folders.push(folderName);
    localStorage.setItem('data', JSON.stringify(data));
}

export function getFoldersFromLocalStorage() {
    let data;
    if (localStorage.getItem('data') === null) {
        data = [[], []];
    } else {
        data = JSON.parse(localStorage.getItem('data'));
    }

    data[0].forEach(folder => {
        addToFoldersList(folder);
    });
}

export function saveTaskToLocalStorage(taskObj) {
    let data = JSON.parse(localStorage.getItem('data'));
    let allTasks = data[1];
    allTasks.push(taskObj);
    localStorage.setItem('data', JSON.stringify(data));
}

export function getTasksFromLocalStorage(folderName) {
    let data = JSON.parse(localStorage.getItem('data'));
    let tasks = data[1].filter(taskObj => taskObj.id.split('-')[0] === folderName);

    const tasksArr = tasks.map(taskObj => {
        let isDoneClass = "";
        let isForTodayClass = "";

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
            isForTodayClass = "todays-task";
        }    
        if (taskObj.isDone) {
            isDoneClass = "task-done";
        }

        return `
            <li id="${taskObj.id}" data-type="task" class="task ${isForTodayClass} ${isDoneClass}">
                <button data-type="checkbox" class="task-buttons checkbox"><i class="fas fa-check"></i></button>
                <input type="text" placeholder="Task" class="task-description saved-task" value="${taskObj.description}" disabled>
                <input type="date" class="task-date saved-task" value="${taskObj.date}" disabled>
                <input type="time" class="task-time saved-task" value="${taskObj.time}" disabled>
                <button data-type="delete" class="task-buttons delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>
                <span class="today-label">today</span>
            </li>
        `;
    })

    return $list.innerHTML = tasksArr.join("");
}

export function deleteTaskFromLocalStorage(taskLi) {
    let data = JSON.parse(localStorage.getItem('data'));

    for (let i = 0; i < data[1].length; i++) {
        if (data[1][i].id === taskLi.id) {
            data[1].splice(i, 1);
        }
    }
    localStorage.setItem('data', JSON.stringify(data));
}

export function saveTaskDoneToLocalStorage(taskObj, isDone) {
    let data = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < data[1].length; i++) {
        if (data[1][i].id === taskObj.id) {
            data[1][i].isDone = isDone;
        }
    }
    localStorage.setItem('data', JSON.stringify(data));
}

export function renderAllTasksFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('data'));
    
    const foldersArr = data[0]
    let allTasksArray = [];

    foldersArr.map(folder => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.textContent = folder;
        h2.style.marginLeft = "20px";
        h2.style.marginBottom = "0px";
        const ul = document.createElement('ul');
        ul.classList.add('list');
        div.appendChild(h2);
        div.appendChild(ul);
        li.appendChild(div);

        let folderTasks = data[1].filter(taskObj => taskObj.id.split('-')[0] === folder);
        const tasks = folderTasks.map(taskObj => {
            let isDoneClass = "";
            let isForTodayClass = "";
            
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
                isForTodayClass = "todays-task";
            }    
            if (taskObj.isDone) {
                isDoneClass = "task-done";
            }

            return `
                <li id="${taskObj.id}" data-type="task" class="task ${isForTodayClass} ${isDoneClass}">
                    <button data-type="checkbox" class="task-buttons checkbox"><i class="fas fa-check"></i></button>
                    <input type="text" placeholder="Task" class="task-description saved-task" value="${taskObj.description}" disabled>
                    <input type="date" class="task-date saved-task" value="${taskObj.date}" disabled>
                    <input type="time" class="task-time saved-task" value="${taskObj.time}" disabled>
                    <button data-type="delete" class="task-buttons delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>
                    <span class="today-label">today</span>
                </li>
            `;
        })

        ul.innerHTML = tasks.join('');
        allTasksArray.push(li);
    });
    
    const $defaultTaskContainer = document.querySelector('[data-type="default-task-container"]');
    $defaultTaskContainer.classList.remove("open-default-task-container");
    const $title = document.querySelector('[data-type="folderTitle"]');
    $title.textContent = '';
    const $prompt = document.querySelector('.task-fill-prompt');
    $prompt.style.display = "none";

    const taskBlocks = allTasksArray.map(block => {
        return `<li>${block.innerHTML}</li>`
    })
    $list.innerHTML = taskBlocks.join('');
}

export function checkIsFolderEmptyFromLocalStorage(folderName) {
    let data = JSON.parse(localStorage.getItem('data'));
    const folderTasks = data[1].filter(task => task.id.split('-')[0] === folderName);
    if (folderTasks.length === 0) {
        return true;
    } else {
        return false;
    }
}

export function deleteFolderAndTasksFromLocalStorage(folderName) {
    let data = JSON.parse(localStorage.getItem('data'));
    const folderIndex = data[0].indexOf(folderName);
    data[0].splice(folderIndex, 1);
    data[1] = data[1].filter(taskObj => taskObj.id.split('-')[0] !== folderName);
    localStorage.setItem('data', JSON.stringify(data));
}

export function checkIsFolderExistsFromLocalStorage(folderName) {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data) {
        if (data[0].includes(folderName)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}