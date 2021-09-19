import { createNewFolderName, nameValidation, addToFoldersList, highlightTheFolder } from './create-folder.js';
import { addEmptyInputField, saveTask, deleteTask, taskDone} from './tasks.js';
import { saveFolderToLocalStorage, getFoldersFromLocalStorage, getTasksFromLocalStorage, saveTaskDoneToLocalStorage, renderAllTasksFromLocalStorage } from './local-storage.js';
// import { saveToLocalStorage, getDataFromLocalStorage } from './local-storage.js';

// variables
const $createListBtn = document.querySelector('[data-type="createListBtn"]');

// listeners
document.addEventListener('DOMContentLoaded', getFoldersFromLocalStorage);
$createListBtn.addEventListener('click', createNewFolderName);

// main DB
export let taskFolders = {};



document.addEventListener('click', (event) => {
    // Creating a new folder
    if (event.target.dataset.type === "createFolderBtn") {
        const $folderNameInput = document.querySelector('[data-type="folderNameInput"]');
        const folderName = $folderNameInput.value;
        $folderNameInput.value = '';

        if (nameValidation(folderName)) {
            saveFolderToLocalStorage(folderName);
            addEmptyInputField(folderName);
            addToFoldersList(folderName);
        }
    }

    // Rendering all tasks and folders together
    if (event.target.dataset.type === "showAllTasksBtn") {
        renderAllTasksFromLocalStorage();
    }

    // Choosing folder from folders list
    if (event.target.dataset.type === "folder") {
        const folderName = event.target.textContent.trim();
        highlightTheFolder(event);
        addEmptyInputField(folderName);
        getTasksFromLocalStorage(folderName);
    }

    // variables for buttons logic below
    const li = event.target.parentNode;
    const input = li.querySelector('.task-description');

    // Saving a new task
    if (event.target.dataset.type === "save") {
        const headerName = li.parentNode.children[0].textContent.trim()
        const saveBtn = li.querySelector('[data-type="save"]');
        
        if (input.value.length > 0) {
            saveTask(headerName, li);
            const defaultTaskInput = document.querySelector('[data-type="default-task-input"]');
            const defaultDate = document.querySelector('[type="date"]');
            const defaultTime = document.querySelector('[type="time"]');
            defaultTaskInput.value = "";
            defaultDate.value = "";
            defaultTime.value = "";
            console.log('Saved.');
        } else {
            saveBtn.disabled;
            console.log("Can't save empty task.");
        }
    }

    // Deleting a task
    if (event.target.dataset.type === "delete") {
        const deleteBtn = li.querySelector('[data-type="delete"]');

        if (input.value.length > 0) {
            deleteTask(li);
            console.log('Deleted.');
        } else {
            deleteBtn.disabled;
            console.log("Nothing to delete");
        }
    }

    // Marking a task as 'done' 
    if (event.target.dataset.type === "checkbox") {
        const checkboxBtn = li.querySelector('[data-type="checkbox"]');
        let isDone;
        if (input.value.length > 0) {
            isDone = taskDone(li);
            saveTaskDoneToLocalStorage(li, isDone);
        } else {
            checkboxBtn.disabled;
            console.log("Empty task can't be done.");
        }
    }
})