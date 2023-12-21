let products = JSON.parse(localStorage.getItem('products')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let instock = document.querySelector('#instock');
let categoryElem = document.querySelector('#category');
let soldout = document.querySelector('#soldout');
let income = document.querySelector('#income');

let totalInStock = 0;
let soldOutCount = 0;
let totalIncome = 0;

for (let product of products) {
    // Calculate total in stock
    totalInStock += parseInt(product.quantity);

    // Calculate sold out products
    if (parseInt(product.quantity) === 0) {
        soldOutCount++;
    }

    // Calculate income
    const productPrice = parseFloat(product.price.replace('$', ''));
    if (!isNaN(productPrice) && parseInt(product.quantity)) {
        totalIncome += parseInt(product.quantity) * productPrice;
    }
}

// Update DOM elements
instock.textContent = totalInStock;
categoryElem.textContent = categories.length;
soldout.textContent = soldOutCount;
income.textContent = !isNaN(totalIncome) ? totalIncome.toFixed(2) + '$' : '$0';
