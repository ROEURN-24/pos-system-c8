
let products = JSON.parse(localStorage.getItem('products')) || [];

function displaySearch() {
    let result = document.querySelector('#result-pro');
    result.remove();
    let id = parseInt(search.value);
    let index = products.findIndex(pro => pro.proId === parseInt(id));
    if (index !== -1) {
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'result-pro');
        console.log(products[index]);
        let liName = document.createElement('li');
        let liQty = document.createElement('li');
        let liCategory = document.createElement('li');
        let liPrice = document.createElement('li');
    
        liName.textContent = products[index].name;
        liCategory.textContent = products[index].category;
        liQty.textContent = products[index].quantity;
        liPrice.textContent = products[index].price;
    
        ul.appendChild(liName);
        ul.appendChild(liCategory);
        ul.appendChild(liQty);
        ul.appendChild(liPrice);

        getProduct.appendChild(ul);
    } else {
        console.log("No products found");
    }
}


const search = document.querySelector('#search-product');
const getProduct = document.querySelector(".get-product");
let orderData = [];
if (localStorage.getItem('order-data') !== null) {
    orderData = localStorage.getItem('order-data')
}
search.addEventListener('keyup', displaySearch);