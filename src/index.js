import { createNewFolder, nameValidation, renderFoldersList } from './create-folder.js';
import { addEmptyInputField, renderTasksList, saveTask, deleteTask, taskDone } from './tasks.js';

// variables
const $createListBtn = document.querySelector('[data-type="createListBtn"]');

// listeners
$createListBtn.addEventListener('click', createNewFolder);

// main DB
export let taskFolders = {};

document.addEventListener('click', (event) => {
    if (event.target.dataset.type === "createFolder") {
        const folderNameInput = document.querySelector('[data-type="folderName"]');
        const folderName = folderNameInput.value;

        if (nameValidation(folderName)) {
            taskFolders[`${folderName}`] = [];
            addEmptyInputField(folderName);
            renderTasksList(taskFolders, folderName);
            renderFoldersList(taskFolders, folderNameInput);
        }
    }

    if (event.target.dataset.type === "folder") {
        const name = event.target.textContent.trim();
        addEmptyInputField(name);
        renderTasksList(taskFolders, name);
    }

    // variables for buttons logic below
    const li = event.target.parentNode;
    const input = li.querySelector('.task-description');

    if (event.target.dataset.type === "save") {
        const headerName = li.parentNode.children[0].textContent.trim()
        const saveBtn = li.querySelector('[data-type="save"]');
        
        if (input.value.length > 0) {
            console.log('Saved.');
            saveTask(taskFolders, headerName, li);
            const defaultTaskInput = document.querySelector('[data-type="default-task-input"]');
            defaultTaskInput.value = "";
        } else {
            saveBtn.disabled;
            console.log("Can't save empty task.");
        }

    }

    if (event.target.dataset.type === "delete") {
        const headerName = document.querySelector('[data-type="folderTitle"]').textContent.trim();
        const deleteBtn = li.querySelector('[data-type="delete"]');
        console.log(headerName);

        if (input.value.length > 0) {
            console.log('Deleted.');
            deleteTask(taskFolders, headerName, li);
        } else {
            deleteBtn.disabled;
            console.log("Nothing to delete");
        }
    }

    if (event.target.dataset.type === "checkbox") {
        const checkboxBtn = li.querySelector('[data-type="checkbox"]');
        const date = li.querySelector('[type="date"]');
        const time = li.querySelector('[type="time"]');

        if (input.value.length > 0) {
            console.log("Task done!");
            taskDone(checkboxBtn, input, date, time);
        } else {
            checkboxBtn.disabled;
            console.log("Empty task can't be done.");
        }
    }
})