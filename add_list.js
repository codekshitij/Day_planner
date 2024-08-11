document.addEventListener('DOMContentLoaded', () => {
    const listForm = document.getElementById('list-form');
    const itemsContainer = document.getElementById('items-container');
    const itemForm = document.getElementById('item-form');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');

    listForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const listName = document.getElementById('list-name').value.trim();
        if (listName) {
            itemsContainer.style.display = 'block'; // Show the items section
            listForm.style.display = 'none'; // Hide the list name form
            document.querySelector('header h1').textContent = `${listName}`; // Update header

            // Optionally, save list name or perform other actions
        }
    });

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
            ${itemText} <button class="remove">Remove</button>
            `;
            itemList.appendChild(li);
            itemInput.value = ''; // Clear the input field
            li.querySelector('.remove').addEventListener('click', () => {
                itemList.removeChild(li);
            });
            
        }

        

        
    });
});




