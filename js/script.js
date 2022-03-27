const { localStorage } = window;

window.addEventListener('DOMContentLoaded', (event) => {
    updateItems();
});

const updateItems = () => {
    const list = document.querySelector('.list').children[0];
    const items = JSON.parse(localStorage.getItem('tasks'));
    let output = '';
    items.forEach((item, index) => {
        output += `
        <div class="todo" data-id="${index}">
            <input value="${item}" disabled></input>
            <div class="buttons">
                <button class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
                <button class="editBtn"><i class="fa-solid fa-pen"></i></button>
            </div>
        </div>`;
    });
    list.innerHTML = output;

    const buttons = document.querySelectorAll('.deleteBtn');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.parentElement.parentElement.dataset.id;
            removeItems(index);
            updateItems();
        });
    });

    const editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = button.parentElement.parentElement.dataset.id;
            const input = button.parentElement.parentElement.children[0];
            if (input.disabled) {
                input.disabled = false;
                button.innerHTML = '<i class="fa-solid fa-check"></i>';
                input.setAttribute('value', '');
                input.focus();
            } else {
                input.disabled = true;
                button.innerHTML = '<i class="fa-solid fa-pen"></i>';
                changeItems(index, input.value);
            }
        });
    });
};

const addItem = (event) => {
    event.preventDefault();

    const input = event.target.children[0];
    if (input.value !== '') {
        const items = JSON.parse(localStorage.getItem('tasks'));
        items.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(items));
        input.value = '';
    }
    updateItems();
};

const removeItems = (index) => {
    const items = JSON.parse(localStorage.getItem('tasks'));
    items.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(items));
};

const changeItems = (index, value) => {
    const items = JSON.parse(localStorage.getItem('tasks'));
    items.splice(index, 1, value);
    localStorage.setItem('tasks', JSON.stringify(items));
};

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    addItem(e);
});
