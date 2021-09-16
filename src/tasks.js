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
        if (task.isDone) {
            return `
                <li id="${task.id}" data-type="task" class="task task-done">
                    <button data-type="checkbox" class="checkbox"><i class="fas fa-check"></i></button>
                    <input type="text" placeholder="Task" class="task-description saved-task" value="${task.description}" disabled>
                    <input type="date" class="task-date saved-task" value="${task.date}" disabled>
                    <input type="time" class="task-time saved-task" value="${task.time}" disabled>   
                    <button data-type="delete" class="delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>
                </li>
            `;
        } else {
            return `
                <li id="${task.id}" data-type="task" class="task">
                    <button data-type="checkbox" class="checkbox"><i class="fas fa-check"></i></button>
                    <input type="text" placeholder="Task" class="task-description saved-task" value="${task.description}" disabled>
                    <input type="date" class="task-date saved-task" value="${task.date}" disabled>
                    <input type="time" class="task-time saved-task" value="${task.time}" disabled>   
                    <button data-type="delete" class="delete-task-btn delete-btn"><i class="far fa-trash-alt"></i></button>
                </li>
            `;
        }
    })

    const title = document.querySelector('[data-type="folderTitle"]');
    const list = document.querySelector('[data-type="task-list"]');

    title.textContent = folderName;
    return list.innerHTML = tasks.join('');
}

export function renderAllTasks(folderTasks) {
    const list = document.querySelector('[data-type="task-list"]');
    const foldersArray = Object.keys(folderTasks);
    let allTasksArray = [];

    foldersArray.map(folder => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.style.borderBottom = "2px solid var(--main-color)";
        const h2 = document.createElement('h2');
        h2.textContent = folder;
        h2.style.marginLeft = "20px";
        const ul = document.createElement('ul');
        ul.classList.add('list');
        div.appendChild(h2);
        div.appendChild(ul);
        li.appendChild(div);

        const tasks = folderTasks[`${folder}`].map(task => {
            if (task.isDone) {
                return `
                    <li id="${task.id}" data-type="task" class="task task-done">
                        <button data-type="checkbox" class="checkbox" disabled><i class="fas fa-check"></i></button>
                        <input type="text" placeholder="Task" class="task-description saved-task" value="${task.description}" disabled>
                        <input type="date" class="task-date saved-task" value="${task.date}" disabled>
                        <input type="time" class="task-time saved-task" value="${task.time}" disabled>   
                    </li>
                `;
            } else {
                return `
                    <li id="${task.id}" data-type="task" class="task">
                        <button data-type="checkbox" class="checkbox" disabled><i class="fas fa-check"></i></button>
                        <input type="text" placeholder="Task" class="task-description saved-task" value="${task.description}" disabled>
                        <input type="date" class="task-date saved-task" value="${task.date}" disabled>
                        <input type="time" class="task-time saved-task" value="${task.time}" disabled>   
                    </li>
                `;
            }
        })

        ul.innerHTML = tasks.join('');
        allTasksArray.push(li);
    });
    
    const defaultTaskContainer = document.querySelector('[data-type="default-task-container"]');
    defaultTaskContainer.classList.remove("open-default-task-container");
    const title = document.querySelector('[data-type="folderTitle"]');
    title.textContent = '';
    const prompt = document.querySelector('.task-fill-prompt');
    prompt.style.display = "none";

    const taskBlocks = allTasksArray.map(block => {
        return `<li>${block.innerHTML}</li>`
    })
    list.innerHTML = taskBlocks.join('');
    
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
        isDone: false
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

export function taskDone(taskFolders, headerName, li) {
    const folder = taskFolders[`${headerName}`];
    folder.forEach(task => {
        if (task.id === li.id) {
            if (li.classList.contains('task-done')) {
                li.classList.remove('task-done');
                task.isDone = false;
            } else {
                li.classList.add('task-done');
                task.isDone = true;
            }
        }
    })
}
