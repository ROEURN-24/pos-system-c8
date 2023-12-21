
function addCategory() {

    let catUniqueID = localStorage.getItem('catUniqueID');
    if (catUniqueID === null || categories.length === 0) {
        catUniqueID = 1;
    } else {
        catUniqueID = parseInt(catUniqueID) + 1;
    }
    localStorage.setItem('catUniqueID', JSON.stringify(catUniqueID));
    let category = {
        catId: catUniqueID,
        name: catName.value
    }

    categories.push(category);
    console.log(categories);

    localStorage.setItem('categories', JSON.stringify(categories));

    window.location.reload();
}


function getCategory() {
    for (let category of categories) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdAction = document.createElement('td');
        tdId.textContent = category.catId;
        tdName.textContent = category.name;

        let deleteIcon = document.createElement('i');
        let editIcon = document.createElement('i');
        deleteIcon.textContent = "delete";
        editIcon.textContent = "edit";
        deleteIcon.className = "material-icons delete";
        editIcon.className = "material-icons edit";

        tdAction.appendChild(deleteIcon);
        tdAction.appendChild(editIcon)

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdAction);

        tbody.appendChild(tr)
    }
}

function deleteCategory(e) {
    let tr = e.target.closest('tr');
    let id = e.target.closest('tr').firstElementChild.textContent;
    let index = categories.findIndex(cat => cat.catId === parseInt(id));
    let isRemove = window.confirm('Are you sure you want to delete this category?');
    if (index !== -1 && isRemove) {
        tr.remove();
        categories.splice(index, 1);
    }

    localStorage.setItem('categories', JSON.stringify(categories));
}

function editCategory(e) {
    // TODO:
    let tr = e.target.closest('tr');
    let id = e.target.closest('tr').firstElementChild.textContent;
    let name = tr.firstElementChild.nextElementSibling.textContent;
    catName.value = name;
    cat_id.value = id;

    alert(`Category ID: ${id}, Name: ${name}`);

}

function updateCategory() {
    let index = categories.findIndex(cat => cat.catId === parseInt(cat_id.value));
    categories[index].name = catName.value;

    localStorage.setItem('categories', JSON.stringify(categories));

    window.location.reload();
}

function searchCategory() {
    let searchInput = document.querySelector('#searchInput').value.toLowerCase();

    // Clear the existing table rows
    tbody.innerHTML = '';

    for (let category of categories) {
        // Convert category name to lowercase for case-insensitive comparison
        let categoryName = category.name.toLowerCase();

        // Check if the search input matches the category name
        if (categoryName.includes(searchInput)) {
            let tr = document.createElement('tr');
            let tdId = document.createElement('td');
            let tdName = document.createElement('td');
            let tdAction = document.createElement('td');

            tdId.textContent = category.catId;
            tdName.textContent = category.name;

            let deleteIcon = document.createElement('i');
            let editIcon = document.createElement('i');
            deleteIcon.textContent = "delete";
            editIcon.textContent = "edit";
            deleteIcon.className = "material-icons delete";
            editIcon.className = "material-icons edit";

            tdAction.appendChild(deleteIcon);
            tdAction.appendChild(editIcon);

            tr.appendChild(tdId);
            tr.appendChild(tdName);
            tr.appendChild(tdAction);

            tbody.appendChild(tr);
        }
    }
}

// Assuming you have an input field for searching with id 'searchInput'
searchInput.addEventListener('input', searchCategory);


let catName = document.querySelector('#cat_name');
let cat_id = document.querySelector('#cat_id');
let btncat = document.querySelector('#btncat');
let catBtnAdd = document.querySelector('#btnAddCat');
let catBtnUpdate = document.querySelector('#btnupdateCat');
let tbody = document.querySelector('tbody');
let categories = [];

if (localStorage.getItem('categories') !== null) {
    categories = JSON.parse(localStorage.getItem('categories'));
}
catBtnAdd.addEventListener('click', addCategory);
catBtnUpdate.addEventListener('click', updateCategory);
getCategory();

let deleteIcons = document.querySelectorAll('.delete');
let editIcons = document.querySelectorAll('.edit');

for (let deleteIcon of deleteIcons) {
    deleteIcon.addEventListener('click', deleteCategory);
}

for (let editIcon of editIcons) {
    editIcon.addEventListener('click', editCategory);
}