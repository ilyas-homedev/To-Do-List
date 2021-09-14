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