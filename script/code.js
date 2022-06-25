let todo = JSON.parse(localStorage.getItem('todo'))
? JSON.parse(localStorage.getItem('todo')) : [
    {
        id: 1,
        item: 'TV Stand',
        createdDate: new Date()
    }
];

document.addEventListener("DOMContentLoaded", () => {
    showItems();
});

function showItems() {
    let items = document.querySelector('#item-group');
    items.innerHTML = "";
    todo.forEach( (item, index) =>
    items.innerHTML +=
    `
    <li class="bg-light list-unstyled" id="${index}">
    <input id="tickbox" type="checkbox" onclick="taskCompleted(${index})" class="chkItem float-start form-check-input">
    <span class="items-input">${item.item}</span>
    <i class="bi bi-x-square-fill list-icon float-end" onclick="deleteItem(${index})" id="${index}"></i>
    </li>
    `)
}

function addItems() {
    try{
        let items = document.getElementById('items-input').value;
        let index = todo.length + 1;
        todo.push(
            {
                id: index !== undefined ? index : 1,
                item: items,
                createdDate: new Date()
            }
        );
        localStorage.setItem('todo', JSON.stringify(todo));
    }catch(e) {
        console.log(e.message);
    }
    showItems();
}

const btnAddItem = document.querySelector('#add');
btnAddItem.addEventListener('click', addItems);

function taskCompleted(id) {
    if(document.querySelectorAll('.chkItem')[id].checked) {
        document.querySelectorAll('.items-input')[id].classList.add('addLine');
    }else {
        document.querySelectorAll('.items-input')[id].classList.remove('addLine');
    }
}

document.querySelector('#sort').addEventListener('click', () => {
    todo.sort( (a, b) => {
        return (a.item < b.item) ? -1: 0;
    });
    localStorage.setItem('todo', JSON.stringify(todo));
    showItems();
})

function deleteItem(id) {
    if(id > -1) {
        todo.splice(id, 1);
        localStorage.setItem('todo', JSON.stringify(todo));
    }
    showItems();
}
