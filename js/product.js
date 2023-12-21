function addProduct() {

    let productUniqueId = localStorage.getItem('productUniqueId');
    if (productUniqueId === null || products.length === 0) {
        productUniqueId = 1;
    } else {
        productUniqueId = parseInt(productUniqueId) + 1;
    }
    localStorage.setItem('productUniqueId', JSON.stringify(productUniqueId));
    let product = {
        proId: productUniqueId,
        name: proName.value,
        category: categoryInput.value,
        quantity: qty.value,
        price: unitPrice.value,
        grossPrice: grossPrice.value,
    }

    products.push(product);


    localStorage.setItem('products', JSON.stringify(products));

    window.location.reload();
}

function getProduct() {
    for (let product of products) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCat = document.createElement('td');
        let tdQty = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdAction = document.createElement('td');
        tdId.textContent = product.proId;
        tdName.textContent = product.name;
        tdCat.textContent = product.category;
        tdQty.textContent = product.quantity;
        tdPrice.textContent = product.price;

        let deleteIcon = document.createElement('i');
        let editIcon = document.createElement('i');
        let viewIcon = document.createElement('i');
        deleteIcon.textContent = "delete";
        editIcon.textContent = "edit";
        viewIcon.textContent = "visibility";
        deleteIcon.className = "material-icons delete";
        editIcon.className = "material-icons edit";
        viewIcon.className = "material-icons view";

        tdAction.appendChild(deleteIcon);
        tdAction.appendChild(editIcon);
        tdAction.appendChild(viewIcon);

        tdId.dataset.grossprice = product.grossPrice;
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCat);
        tr.appendChild(tdQty);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);

        tbody.appendChild(tr)
    }
}
function deleteProduct(e) {
    let tr = e.target.closest('tr');
    let id = tr.firstElementChild.textContent;
    let index = products.findIndex(pro => pro.id === parseInt(id));
    let isRemove = window.confirm('Are you sure you want to delete this product?');
    if (index !== -1 && isRemove) {
        tr.remove();
        products.splice(index, 1);
    }
    localStorage.setItem('products', JSON.stringify(products))
}
function editProduct(e) {
    let tr = e.target.closest('tr');
    let id = e.target.closest('tr').firstElementChild.textContent;
    let name = tr.firstElementChild.nextElementSibling.textContent;
    let gross = tr.firstElementChild.dataset.grossprice;
    let category = tr.firstElementChild.nextElementSibling.nextElementSibling.textContent;
    let quantities = tr.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
    let price = tr.lastElementChild.previousElementSibling.textContent;
    proName.value = name;
    proHiddenId.value = id;
    categoryInput.value = category;
    qty.value = quantities;
    grossPrice.value = gross;
    unitPrice.value = price;
}

function updateProduct() {
    let index = products.findIndex(pro => pro.proId === parseInt(proHiddenId.value));
    products[index].name = proName.value;
    products[index].category = categoryInput.value;
    products[index].quantity = qty.value;
    products[index].price = unitPrice.value;
    products[index].grossPrice = grossPrice.value;

    localStorage.setItem('products', JSON.stringify(products)); //
    window.location.reload();
}

function viewProduct(e) {
    let tr = e.target.closest('tr');
    let id = tr.firstElementChild.textContent;
    // You can customize the logic for displaying product details as needed
    alert(`Viewing product with ID: ${id}`);
}


function filterProduct() {
    let selectedCategory = categoryFilter.value;
    // You can filter and display products based on the selected category
    // Update the logic based on your requirements
    let filteredProducts = products.filter(product => product.category === selectedCategory);
    // Display the filtered products in the UI (you might need to clear and re-render the product list)
    renderProducts(filteredProducts);
}

function searchProduct() {
    let searchTerm = document.getElementById('search-product').value.toLowerCase();
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    // Display the filtered products in the UI
    renderProducts(filteredProducts);
}

function showCategory(select) {
    for (let category of categories) {
        let option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        select.appendChild(option);
    }

}

let categories = JSON.parse(localStorage.getItem('categories'));
const categoryFilter = document.querySelector('#categoryFilter');
const categoryInput = document.querySelector('#category');
const proName = document.querySelector('#product_name');
const unitPrice = document.querySelector('#unit_price');
const qty = document.querySelector('#qty');
const grossPrice = document.querySelector('#gross_price');
const btnAdd = document.querySelector('.productAdd');
const tbody = document.querySelector('tbody');
const proHiddenId = document.querySelector('#pro_id');
const btnUpdate = document.querySelector('.productUpdate');
let products = [];

if (localStorage.getItem('products') !== null) {
    products = JSON.parse(localStorage.getItem('products'));
}

showCategory(categoryFilter);
showCategory(categoryInput);

btnAdd.addEventListener('click', addProduct)
btnUpdate.addEventListener('click', updateProduct);
getProduct();

let deleteIcons = document.querySelectorAll('.delete');
let editIcons = document.querySelectorAll('.edit');
let viewIcons = document.querySelectorAll('.view');


for (let deleteIcon of deleteIcons) {
    deleteIcon.addEventListener('click', deleteProduct);
}

for (let editIcon of editIcons) {
    editIcon.addEventListener('click', editProduct);
}

for (let view of viewIcons) {
    view.addEventListener('click', viewProduct);
}


document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    const addButton = document.querySelector('.table-head button');

    // Get the form-container element
    const formContainer = document.querySelector('.form-container');

    // Add click event listener to the button
    addButton.addEventListener('click', function () {
        // Toggle the visibility of form-container
        if (formContainer.style.display === 'none' || formContainer.style.display === '') {
            formContainer.style.display = 'block'; // Show the form-container
        } else {
            formContainer.style.display = 'none';  // Hide the form-container
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    // Get the form-container element
    const formContainer = document.querySelector('.form-container');

    let isDragging = false;
    let offsetX, offsetY;

    // Function to handle mouse down event
    function handleMouseDown(event) {
        isDragging = true;

        // Calculate the offset between mouse position and the form-container's position
        offsetX = event.clientX - formContainer.getBoundingClientRect().left;
        offsetY = event.clientY - formContainer.getBoundingClientRect().top;

        // Add event listeners for mousemove and mouseup events
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    // Function to handle mouse move event
    function handleMouseMove(event) {
        if (!isDragging) return;

        // Calculate the new position for the form-container
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        // Set the new position
        formContainer.style.left = x + 'px';
        formContainer.style.top = y + 'px';
    }

    // Function to handle mouse up event
    function handleMouseUp() {
        isDragging = false;

        // Remove event listeners for mousemove and mouseup events
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // Add mousedown event listener to the form-container
    formContainer.addEventListener('mousedown', handleMouseDown);
});



