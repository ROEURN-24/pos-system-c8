let products = JSON.parse(localStorage.getItem("products")) || [];

function displaySearch() {
    let result = document.querySelector("#result-pro");
    result.remove();
    let id = parseInt(search.value);
    let index = products.findIndex((pro) => pro.proId === parseInt(id));
    if (index !== -1) {
        let ul = document.createElement("ul");
        ul.setAttribute("id", "result-pro");
        console.log(products[index]);
        let liName = document.createElement("li");
        let liQty = document.createElement("li");
        let liCategory = document.createElement("li");
        let liPrice = document.createElement("li");

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

const search = document.querySelector("#searhc-product");
let getProduct = document.querySelector(".get-product #get-products");
let orderData = [];
if (localStorage.getItem("order-data") !== null) {
    orderData = localStorage.getItem("order-data");
}

function createCard(value) {
    let card = document.createElement("div");
    let cardId = document.createElement("p");
    cardId.textContent = "id: " + value.id;
    let cardName = document.createElement("p");
    cardName.textContent = "name: " + value.name;
    let cardPrice = document.createElement("p");
    cardPrice.textContent = "price: " + value.price;
    let cardStock = document.createElement("p");
    cardStock.textContent = "stock: " + value.quantity;

    card.style.border = "1px solid black";
    card.style.margin = '5px';
    card.style.padding = '5px';

    card.appendChild(cardId);
    card.appendChild(cardName);
    card.appendChild(cardPrice);
    card.appendChild(cardStock);
    getProduct.appendChild(card);
}

search.addEventListener("keyup", () => {
    getProduct.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < data.length; i++) {
        if (toString(data[i]["id"]).includes(toString(search.value))) {
            createCard(data[i]);
        }
    }
});
search.addEventListener("keyup", displaySearch);
function displaySearch() {
    let result = document.querySelector("#result-pro");
    if (result) result.remove();

    let id = parseInt(search.value);
    let index = products.findIndex((pro) => pro.proId === id);

    if (index !== -1) {
        let ul = document.createElement("ul");
        ul.setAttribute("id", "result-pro");

        let liName = document.createElement("li");
        let liQty = document.createElement("li");
        let liCategory = document.createElement("li");
        let liPrice = document.createElement("li");

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

function createCard(value) {
    let card = document.createElement("div");

    let cardId = document.createElement("p");
    cardId.textContent = "id: " + value.proId;  // Corrected to value.proId

    let cardName = document.createElement("p");
    cardName.textContent = "name: " + value.name;

    let cardPrice = document.createElement("p");
    cardPrice.textContent = "price: " + value.price;

    let cardStock = document.createElement("p");
    cardStock.textContent = "stock: " + value.quantity;

    card.style.border = "1px solid black";
    card.style.margin = '5px';
    card.style.padding = '5px';

    card.appendChild(cardId);
    card.appendChild(cardName);
    card.appendChild(cardPrice);
    card.appendChild(cardStock);

    getProduct.appendChild(card);
}


