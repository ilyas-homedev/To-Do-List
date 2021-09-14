export function addEmptyInputField(folderArray, folderName) {
    const randomNumber = Math.floor(Math.random() * 10000);
    const id = `${folderName}_task_${randomNumber}`;
    
    const emptyField = {
        id: id,
        description: '',
        date: '',
        time: '',
    }

    folderArray[`${folderName}`].push(emptyField);
    renderTasksList(folderArray, folderName);
}

export function renderTasksList(folderTasksList, folderName) {
    const tasks = folderTasksList[`${folderName}`].map(task => {
        if (task.description.length === 0) {
            return `
                <li id="${task.id}" data-type="task" class="task">
                    <input type="text" placeholder="Task" class="task-description" value="${task.description}">
                    <input type="date" class="task-date" value="${task.date}">
                    <input type="time" class="task-time" value="${task.time}">
                    <button data-type="save" class="save-task-btn"><i class="fas fa-save"></i></button>
                    <button data-type="delete" class="delete-task-btn"><i class="far fa-trash-alt"></i></button>
                </li>
            `;
        } else {
            return `
                <li id="${task.id}" data-type="task" class="task">
                    <input type="text" placeholder="Task" class="task-description" value="${task.description}" disabled>
                    <input type="date" class="task-date" value="${task.date}" disabled>
                    <input type="time" class="task-time" value="${task.time}" disabled>
                    <button data-type="save" class="save-task-btn" disabled><i class="fas fa-save"></i></button>
                    <button data-type="delete" class="delete-task-btn"><i class="far fa-trash-alt"></i></button>
                </li>
            `;
        }
    })

    const title = document.querySelector('[data-type="folderTitle"]');
    const list = document.querySelector('[data-type="task-list"]');

    title.textContent = folderName;
    return list.innerHTML = tasks.join('');
}

export function saveTask(folderTasksList, folderName, li) {
    const description = li.querySelector('.task-description').value;
    const date = li.querySelector('.task-date').value;
    const time = li.querySelector('.task-time').value;
    const saveBtn = li.querySelector('[data-type="save"]');
    
    const randomNumber = Math.floor(Math.random() * 10000);
    const id = `${folderName}_task_${randomNumber}`;

    const newTask = {
        id: id,
        description: description,
        date: date,
        time: time,
    }

    folderTasksList[`${folderName}`].splice(1, 0, newTask);
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