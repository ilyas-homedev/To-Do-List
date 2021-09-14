import { createNewFolder, nameValidation } from './create-folder.js';
import { addEmptyInputField, renderTasksList, saveTask, deleteTask } from './tasks.js';

// variables
const $createListBtn = document.querySelector('[data-type="createListBtn"]');

// listeners
$createListBtn.addEventListener('click', createNewFolder);


export let taskFolders = {};


document.addEventListener('click', (event) => {
    if (event.target.dataset.type === "createFolder") {
        const $folderName = document.querySelector('[data-type="folderName"]');
        const name = $folderName.value;

        if (nameValidation(name)) {
            taskFolders[`${name}`] = [];
            addEmptyInputField(taskFolders, name);
            const list = document.querySelector('[data-type="list"]');
            const foldersArray = Object.keys(taskFolders);
            
            const array = foldersArray.map(name => {
                return `
                    <li data-type="folder" class="folder"><i class="far fa-folder"></i> ${name}</li>
                `;
            })
            $folderName.value = '';
            return list.innerHTML = array.join("");
        }
    }

    if (event.target.dataset.type === "folder") {
        const name = event.target.textContent.trim();
        
        renderTasksList(taskFolders, name);
    }

    if (event.target.dataset.type === "save") {
        console.log('Saving');
        const li = event.target.parentNode;
        const name = li.parentNode.parentNode.children[0].textContent.trim()
        const input = li.querySelector('.task-description');
        const saveBtn = li.querySelector('[data-type="save"]');
        
        if (input.value.length > 0) {
            saveTask(taskFolders, name, li);
        } else {
            saveBtn.disabled;
            console.log("Empty input");
        }

    }

    if (event.target.dataset.type === "delete") {
        console.log('Deleting');
        const li = event.target.parentNode;
        const name = li.parentNode.parentNode.children[0].textContent.trim();
        const input = li.querySelector('.task-description');
        const deleteBtn = li.querySelector('[data-type="delete"]');
        
        if (input.value.length > 0) {
            deleteTask(taskFolders, name, li);
        } else {
            deleteBtn.disabled;
            console.log("Nothing to delete");
        }
    }
})