main();

function main() {
    displayCart();
    basketTotalPrice();
    toEmptyCart();
}

function displayCart() {
    let basket = JSON.parse(localStorage.getItem("produit"));
    if (basket == null || basket.length == 0) {
        let el2 = document.querySelector(".formulaire");
        el2.remove();
        el3 = document.querySelector(".order_total");
        el3.remove();
        let el4 = document.querySelector(".cart_buttons");
        el4.remove();
    } else {
        let el = document.querySelector("#emptyBasket");
        el.remove();
        document.querySelector(".cart_section").style.display = "block";
    }

    let structureProductBasket = [];
    for (k = 0; k < basket.length; k++) {
        document.querySelector(".cart_section").innerHTML += ` <div class="row basketEffect" id="${basket[k].id}">
            <div class="cart_item_image"><img class="imgteddy img-fluid p-1" src="${basket[k].image}" alt=""></div>
            <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                <div class="cart_item_name cart_info_col">
                    <div class="cart_item_title">Name</div>
                    <div class="cart_item_text basket-name">${basket[k].name}</div>
                </div>
                <div class="cart_item_price cart_info_col">
                    <div class="cart_item_title">Quantity</div>
                    <div class="cart_item_text basket-quantity">${basket[k].quantity}</div>
                </div>
                <div class="cart_item_total cart_info_col">
                    <div class="cart_item_title">Price</div>
                    <div class="cart_item_text basket-price">${(basket[k].quantity * basket[k].price / 100).toFixed(2)} €</div>
                </div>
                <div class="cart_item_supp"> <button type="button" class="btn-supp" data-id="${basket[k].id}">Supprimer</button></div>
            </div>
        </div>  
        `;

        Array.from(document.getElementsByClassName("btn-supp")).forEach(function(element) {
            element.addEventListener('click', function(e) {
                deleteProduct(this.dataset.id);
            });
        });
    }
}

function basketTotalPrice() {
    let basket = JSON.parse(localStorage.getItem("produit"));
    let totalPrice = 0;
    for (let m = 0; m < basket.length; m++) {
        totalPrice += basket[m].price * basket[m].quantity;
    }
    document.querySelector(".order_total_amount").innerHTML = (totalPrice / 100).toFixed(2) + ' €';
}


function deleteProduct(productId) {
    let basket = JSON.parse(localStorage.getItem("produit"));
    for (k = 0; k < basket.length; k++) {
        var productBasket = basket[k];
        if (productBasket.id == productId) {
            basket.splice(k, 1);
        }
    }

    var element = document.getElementById(productId);
    element.parentNode.removeChild(element);
    localStorage.setItem("produit", JSON.stringify(basket));
    basketTotalPrice();
    if (basket.length == 0) {
        clearLocalStorage();
    }
}


function toEmptyCart() {
    let buttonToEmptyCart = document.getElementById("empty-cart");
    buttonToEmptyCart.addEventListener("click", () => {
        clearLocalStorage();
    });
}

function clearLocalStorage() {
    localStorage.clear();
    window.location.href = "panier.html";
}