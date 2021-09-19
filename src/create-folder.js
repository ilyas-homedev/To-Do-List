const $emptyContainer = document.querySelector('[data-type="empty-container"]');
const $list = document.querySelector('[data-type="list"]');

export function createNewFolderName() {
    const html = `
        <div class="create-folder-container">
            <h2>Create new folder</h2>
            <div class="input-btn-field">
                <input data-type="folderNameInput" type="text" class="create-folder-input" placeholder="Folder name">
                <button data-type="createFolderBtn" class="create-folder-btn"><i class="fas fa-plus"></i></button>
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

export function addToFoldersList(folderName) {
    const li = document.createElement("li");
    li.dataset.type = "folder";
    li.classList.add("folder");
    li.innerHTML = `<i class="far fa-folder"></i> ${folderName}</li>`
    $list.appendChild(li);
}

export function highlightTheFolder(event) {
    const allFolders = Array.from(event.target.parentNode.children);
    allFolders.forEach(folder => {
        folder.classList.remove('folder-highlight');
    });
    event.target.classList.add('folder-highlight');
}