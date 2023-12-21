

let products = JSON.parse(localStorage.getItem('products')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let instock = document.querySelector('#instock');
let category = document.querySelector('#category');
let soldout = document.querySelector('#soldout');
let income = document.querySelector('#income');

let total = 0;
for (let product of products) {
    total += parseInt(product.quantity);
}
instock.textContent = total;
category.textContent = categories.length;

// Calculate sold out products
let soldOutCount = 0;
for (let product of products) {
    if (parseInt(product.quantity) === 0) {
        soldOutCount++;
    }
}
soldout.textContent = soldOutCount;


// Calculate income
let totalIncome = 0;
for (let product of products) {
    const productPrice = parseFloat(product.price.replace('$', ''));
    if (!isNaN(productPrice) && parseInt(product.quantity)) {
        totalIncome += parseInt(product.quantity) * productPrice;
    }
}

// Set income text content
if (!isNaN(totalIncome)) {
    income.textContent = totalIncome.toFixed(2) + '$';
} else {
    income.textContent = '$0';
}
