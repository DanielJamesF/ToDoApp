let lists = JSON.parse(localStorage.getItem('items')) ? 
JSON.parse( localStorage.getItem('items')) : [
    {
        id: 1,
        item: 'TV Stand',
        createdDate: new Date()
    }
];

document.addEventListener("DOMContentLoaded", ()=> {
    readItems();
});

function readItems() {
    let contents = document.querySelector('#item-wrapper');
    contents.innerHTML = "";
    lists.forEach( (item, index)=> {
        contents.innerHTML += 
        `
        <li class="bg-light list-unstyled" id="${index}">
        <input type="checkbox" onclick="itemCompleted(${index})" class="chkItem form-check-input">
        <span class="list-content">${item.item}</span>
        <i class="bi bi-x-octagon-fill list-icon" onclick="removeItem(${index})" id="${index}"></i>
        </li>
        `;
    } );
}

function addItems() {
    try{
        let list = document.getElementById('list-content').value;
        let index = lists.length + 1;
        lists.push(
            {
                id: index !== undefined ? index : 1 , 
                item: list,
                createdDate: new Date()
            }
        );
        localStorage.setItem('items', JSON.stringify(lists));    
    }catch(e) {
        console.log(e.message);
    }
    readItems();
}

const btnAddItem = document.querySelector('#Add');
btnAddItem.addEventListener('click', addItems);

function itemCompleted(id) {
    if(document.querySelectorAll('.chkItem')[id].checked) {
        document.querySelectorAll('.list-content')[id].classList.add('addLine');
    }else {
        document.querySelectorAll('.list-content')[id].classList.remove('addLine');
    }
}

document.querySelector('#sort').addEventListener('click', ()=> {
    lists.sort( (a, b)=> {
        return (a.item < b.item) ? -1: 0; 
    });
    localStorage.setItem('items', JSON.stringify(lists));   
    readItems(); 
});

function removeItem(id) {
    if(id > -1) {
        lists.splice(id, 1); 
        localStorage.setItem('items', JSON.stringify(lists));        
    }
    readItems();
}