const $emptyContainer = document.querySelector('[data-type="empty-container"]');

export function createNewFolder() {
    const html = `
        <div class="create-folder-container">
            <h2>Create new folder</h2>
            <div class="input-btn-field">
                <input data-type="folderName" type="text" class="create-folder-input" placeholder="Folder name">
                <button data-type="createFolder" class="create-folder-btn"><i class="fas fa-plus"></i></button>
                <p class="invalid-name-prompt">Folder name can't be empty!</p>
            </div>
        </div>
    `;
    
    $emptyContainer.innerHTML = html;
}


export function nameValidation(name) {
    const prompt = $emptyContainer.querySelector('.invalid-name-prompt');

    if (name !== "") {
        prompt.style.display = "none";
        return true;
    } else {
        prompt.style.display = "block";
        return false;
    }
}

export function renderFoldersList(taskFolders, folderNameInput) {
    const list = document.querySelector('[data-type="list"]');
    const foldersArray = Object.keys(taskFolders);
    const array = foldersArray.map(name => {
        return `
            <li data-type="folder" class="folder"><i class="far fa-folder"></i> ${name}</li>
        `;
    })
    folderNameInput.value = '';
    return list.innerHTML = array.join("");
}

export function highlightTheFolder(event) {
    const allFolders = Array.from(event.target.parentNode.children);
    allFolders.forEach(folder => {
        folder.classList.remove('folder-highlight');
    });
    event.target.classList.add('folder-highlight');
}