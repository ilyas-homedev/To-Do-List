import { createNewFolderName, nameValidation, addToFoldersList, highlightTheFolder, confirmFolderDeleting, deleteFolder } from './create-folder.js';
import { addEmptyInputField, saveTask, deleteTask, taskDone} from './tasks.js';
import { saveFolderToLocalStorage, getFoldersFromLocalStorage, getTasksFromLocalStorage, saveTaskDoneToLocalStorage, renderAllTasksFromLocalStorage, checkIsFolderEmptyFromLocalStorage, deleteFolderAndTasksFromLocalStorage } from './local-storage.js';

// variables
const $createListBtn = document.querySelector('[data-type="createListBtn"]');
const $confirmationDialog = document.querySelector('.confirmation-container');
const $layout = document.querySelector('.layout');

// listeners
document.addEventListener('DOMContentLoaded', getFoldersFromLocalStorage);
$createListBtn.addEventListener('click', createNewFolderName);
$confirmationDialog.addEventListener('click', folderDeletingConfirmation);


// Variable for saving folder li for deleting it after confirmation
let folderLi

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

    // Open delete buttons for folders li
    if (event.target.dataset.type === "delete-folder-btn") {
        const trashbuskets = document.querySelectorAll('.folder-trash');
        trashbuskets.forEach(busket => {
            busket.style.display = "block";
        })
    }

    // Click on trash busket of folder for deleting it
    if (event.target.dataset.type === "delete-current-folder-btn") {
        const trashbuskets = document.querySelectorAll('.folder-trash');
        trashbuskets.forEach(busket => {
            busket.style.display = "none";
        })
        const folderName = event.target.parentNode.textContent.trim();
        const folderIsEmpty = checkIsFolderEmptyFromLocalStorage(folderName);
        if (folderIsEmpty) {
            deleteFolderAndTasksFromLocalStorage(folderName);
            deleteFolder(event.target.parentNode);
        } else {
            openDialog(folderName);
            folderLi = event.target.parentNode;
        }
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

function folderDeletingConfirmation(event) {
    if (event.target.dataset.type === "confirmDeleting") {
        deleteFolderAndTasksFromLocalStorage(event.target.id);
        deleteFolder(folderLi);
        closeDialog();
    }
    if (event.target.dataset.type === "cancelDeleting") {
        closeDialog();
    }
}

function openDialog(folderName) {
    $confirmationDialog.style.display = "block";
    $confirmationDialog.id = folderName;
    $layout.style.display = "block";
}

function closeDialog() {
    $confirmationDialog.style.display = "none";
    $confirmationDialog.id = "";
    $layout.style.display = "none";
}

