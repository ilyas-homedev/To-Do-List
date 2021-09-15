export function addEmptyInputField(folderName) {
    const defaultTaskContainer = document.querySelector('[data-type="default-task-container"]');
    defaultTaskContainer.classList.add("open-default-task-container");

    const title = document.querySelector('[data-type="folderTitle"]');
    title.textContent = folderName;

    const prompt = document.querySelector('.task-fill-prompt');
    prompt.style.display = "block";
}

export function renderTasksList(folderTasksList, folderName) {
    const tasks = folderTasksList[`${folderName}`].map(task => {
        return `
            <li id="${task.id}" data-type="task" class="task">
                <button data-type="checkbox" class="checkbox"><i class="fas fa-check"></i></button>
                <input type="text" placeholder="Task" class="task-description saved-task" value="${task.description}" disabled>
                <input type="date" class="task-date saved-task" value="${task.date}" disabled>
                <input type="time" class="task-time saved-task" value="${task.time}" disabled>   
                <button data-type="delete" class="delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>
            </li>
        `;
    })

    const title = document.querySelector('[data-type="folderTitle"]');
    const list = document.querySelector('[data-type="task-list"]');

    title.textContent = folderName;
    return list.innerHTML = tasks.join('');
}

export function saveTask(folderTasksList, folderName, li) {
    const description = li.querySelector('.task-description');
    const date = li.querySelector('.task-date');
    const time = li.querySelector('.task-time');
    
    const randomNumber = Math.floor(Math.random() * 10000);
    const id = `${folderName}_task_${randomNumber}`;

    const newTask = {
        id: id,
        description: description.value,
        date: date.value,
        time: time.value,
    }

    folderTasksList[`${folderName}`].unshift(newTask);
    console.log(folderTasksList);

    renderTasksList(folderTasksList, folderName);
}

export function deleteTask(folderTasksList, folderName, li) {
    const taskArray = folderTasksList[`${folderName}`];
    taskArray.forEach(task => {
        if (task.id === li.id) {
            const index = taskArray.indexOf(task);
            taskArray.splice(index, 1);
        }
    })

    if (taskArray.length === 0) {
        addEmptyInputField(folderTasksList, folderName);
    }
    renderTasksList(folderTasksList, folderName);
}

export function taskDone(checkboxBtn, input, date, time) {
    if (checkboxBtn.classList.contains('task-done')) {
        checkboxBtn.classList.remove('task-done');
        input.style.color = "var(--main-color)";
        date.style.color = "var(--main-color)";
        time.style.color = "var(--main-color)";
    } else {
        checkboxBtn.classList.add('task-done');
        input.style.color = "#ccc";
        date.style.color = "#ccc";
        time.style.color = "#ccc";
    }
}