document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const catName = document.querySelector('#cat_name');
    const cat_id = document.querySelector('#cat_id');
    const btncat = document.querySelector('#btncat');
    const catBtnAdd = document.querySelector('#btnAddCat');
    const catBtnUpdate = document.querySelector('#btnupdateCat');
    const tbody = document.querySelector('tbody');
    const searchInput = document.querySelector('#searchInput');
    const deleteIcons = document.querySelectorAll('.delete');
    const editIcons = document.querySelectorAll('.edit');

    // Categories Array
    let categories = [];

    // Check if categories exist in localStorage and populate categories array
    if (localStorage.getItem('categories')) {
        categories = JSON.parse(localStorage.getItem('categories'));
    }

    // Event Listeners
    catBtnAdd.addEventListener('click', addCategory);
    catBtnUpdate.addEventListener('click', updateCategory);
    searchInput.addEventListener('input', searchCategory);
    deleteIcons.forEach(icon => icon.addEventListener('click', deleteCategory));
    editIcons.forEach(icon => icon.addEventListener('click', editCategory));

    // Functions
    function addCategory() {
        let catUniqueID = localStorage.getItem('catUniqueID') || 0;
        catUniqueID = parseInt(catUniqueID) + 1;
        localStorage.setItem('catUniqueID', JSON.stringify(catUniqueID));

        const category = {
            catId: catUniqueID,
            name: catName.value
        };

        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));

        window.location.reload();
    }

    function getCategory() {
        tbody.innerHTML = '';
        for (const category of categories) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${category.catId}</td>
                <td>${category.name}</td>
                <td>
                    <i class="material-icons delete">delete</i>
                    <i class="material-icons edit">edit</i>
                </td>
            `;
            tbody.appendChild(tr);
        }
    }

    function deleteCategory(e) {
        const tr = e.target.closest('tr');
        const id = tr.querySelector('td:first-child').textContent;
        const index = categories.findIndex(cat => cat.catId === parseInt(id));

        if (index !== -1 && window.confirm('Are you sure you want to delete this category?')) {
            tr.remove();
            categories.splice(index, 1);
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }

    function editCategory(e) {
        const tr = e.target.closest('tr');
        const id = tr.querySelector('td:first-child').textContent;
        const name = tr.querySelector('td:nth-child(2)').textContent;

        catName.value = name;
        cat_id.value = id;
        alert(`Category ID: ${id}, Name: ${name}`);
    }

    function updateCategory() {
        const index = categories.findIndex(cat => cat.catId === parseInt(cat_id.value));
        if (index !== -1) {
            categories[index].name = catName.value;
            localStorage.setItem('categories', JSON.stringify(categories));
            window.location.reload();
        }
    }

    function searchCategory() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm));
        categories = filteredCategories;
        getCategory();
    }

    // Initial Function Call
    getCategory();
});
