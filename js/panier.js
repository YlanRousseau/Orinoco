let productSaveLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productSaveLocalStorage);

main();

function main() {
    displayCart();
    basketTotalPrice();
}

function displayCart() {
    if (localStorage.getItem("produit")) {
        let el = document.querySelector("#emptyBasket");
        el.remove();
        document.querySelector(".cart_section").style.display = "block";

    } else {
        let el2 = document.querySelector(".formulaire");
        el2.remove();
        el3 = document.querySelector(".order_total");
        el3.remove();
    }

    let structureProductBasket = [];
    for (k = 0; k < productSaveLocalStorage.length; k++) {
        document.querySelector(".cart_section").innerHTML += ` <div class="row basketEffect">
            <div class="cart_item_image"><img class="imgteddy img-fluid p-1" src="${productSaveLocalStorage[k].image}" alt=""></div>
            <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                <div class="cart_item_name cart_info_col">
                    <div class="cart_item_title">Name</div>
                    <div class="cart_item_text basket-name">${productSaveLocalStorage[k].name}</div>
                </div>
                <div class="cart_item_price cart_info_col">
                    <div class="cart_item_title">Quantity</div>
                    <div class="cart_item_text basket-quantity">${productSaveLocalStorage[k].quantity}</div>
                </div>
                <div class="cart_item_total cart_info_col">
                    <div class="cart_item_title">Price</div>
                    <div class="cart_item_text basket-price">${productSaveLocalStorage[k].price}  €</div>
                </div>
            </div>
        </div>  
        `
    }

}

function basketTotalPrice() {
    let totalPriceCalcul = [];
    for (let m = 0; m < productSaveLocalStorage.length; m++) {
        let priceProductBasket = productSaveLocalStorage[m].price;
        totalPriceCalcul.push(priceProductBasket);
        console.log(totalPriceCalcul);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = totalPriceCalcul.reduce(reducer);
    console.log(totalPrice);

    document.querySelector(".order_total_amount").innerHTML = totalPrice + ' €';
}