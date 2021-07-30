basketNumb()
main();

function main() {
    displayCart();
    basketTotalPrice();
    toEmptyCart();
    checkFormAndPost();

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
    let listeProduits = document.getElementById('liste');
    for (k = 0; k < basket.length; k++) {

        let templateElt = document.getElementById('productLine');
        let cloneElt = document.importNode(templateElt.content, true);
        cloneElt.querySelector('.basketEffect').id = basket[k].id;

        var imgTeddy = cloneElt.getElementById('imgTeddy');
        imgTeddy.src = basket[k].image;
        imgTeddy.removeAttribute('id');

        var teddyName = cloneElt.getElementById('teddyName');
        teddyName.innerHTML = basket[k].name;
        teddyName.removeAttribute('id');

        var quantity = cloneElt.getElementById('quantity');
        quantity.innerHTML = basket[k].quantity;
        quantity.removeAttribute('id');

        var teddyPrice = cloneElt.getElementById('teddyPrice');
        teddyPrice.innerHTML = (basket[k].quantity * basket[k].price / 100).toFixed(2);
        teddyPrice.removeAttribute('id');

        var btnSupp = cloneElt.getElementById('btn-supp');
        btnSupp.dataset.id = basket[k].id;
        btnSupp.removeAttribute('id');
        listeProduits.appendChild(cloneElt);

    }

    Array.from(document.getElementsByClassName("btn-supp")).forEach(function(element) {
        element.addEventListener('click', function(e) {
            deleteProduct(this.dataset.id);
        });
    });
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

function checkFormAndPost() {
    const order = document.getElementById("order");
    const nameRegex = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const adressRegex = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const cityRegex = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const checkBox = document.getElementById("invalidCheck");

    order.addEventListener("click", (e) => {
        e.preventDefault();
        let inputName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputCity = document.getElementById("city");
        let inputAdress = document.getElementById("address");
        let inputMail = document.getElementById("email");
        if (
            (nameRegex.test(inputName.value) == true) &
            (nameRegex.test(inputLastName.value) == true) &
            (emailRegex.test(inputMail.value) == true) &
            (cityRegex.test(inputCity.value) == true) &
            (adressRegex.test(inputAdress.value) == true) &
            (checkBox.checked == true)
        ) {

            let basket = JSON.parse(localStorage.getItem("produit"));
            let productOrder = [];
            for (listeId of basket) {
                productOrder.push(listeId.id);
                JSON.stringify(productOrder);
            }

            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: productOrder,
            };

            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            console.log(options);
            let priceConfirmation = document.querySelector(".totalprice").innerText;
            priceConfirmation = priceConfirmation.split(" :");

            fetch("http://localhost:3000/api/teddies/order", options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("orderId", data.orderId);
                    localStorage.setItem("total", priceConfirmation);
                    document.location.href = "order.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        } else {
            alert("Veuillez correctement remplir le formulaire pour valider votre commande.");
        }
    })
}