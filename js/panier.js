basketNumb()
main();

function main() {
    displayCart();
    basketTotalPrice();
    toEmptyCart();
    checkFormAndPost();

}
// Afficher panier vide si aucun article est dans le panier, si un ou des articles sont présent ont les affichent.
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
        teddyPrice.innerHTML = (basket[k].quantity * basket[k].price / 100).toFixed(2) + ` €`;
        teddyPrice.removeAttribute('id');

        var btnSupp = cloneElt.getElementById('btn-supp');
        btnSupp.dataset.id = basket[k].id;
        btnSupp.removeAttribute('id');
        listeProduits.appendChild(cloneElt);

    }
    // Bouton supprimer article individuellement 
    Array.from(document.getElementsByClassName("btn-supp")).forEach(function(element) {
        element.addEventListener('click', function(e) {
            deleteProduct(this.dataset.id);
        });
    });
}
// Affichage du prix total des éléments ce trouvant dans le panier 
function basketTotalPrice() {
    let basket = JSON.parse(localStorage.getItem("produit"));
    let totalPrice = 0;
    for (let m = 0; m < basket.length; m++) {
        totalPrice += basket[m].price * basket[m].quantity;
    }
    document.querySelector(".order_total_amount").innerHTML = (totalPrice / 100).toFixed(2) + ' €';
}

// Fonction permettant de supprimer l'article désiré par rapport à son id 
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

// Permet de vider la panier dans son ensemble 
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
// Vérifie le formulaire et envoie une réponse de l'api 
function checkFormAndPost() {
    const order = document.getElementById("order");
    const nameRegex = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const adressRegex = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const cityRegex = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const checkBox = document.getElementById("invalidCheck");
    // Au click le formulaire est vérifié par les regex
    order.addEventListener("click", (e) => {
        e.preventDefault();
        let inputName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputCity = document.getElementById("city");
        let inputAdress = document.getElementById("address");
        let inputMail = document.getElementById("email");
        // Lors d'un clic, si l'un des champs n'est pas rempli, ou pas correctement formaté, on affiche une erreur, on empêche l'envoi du formulaire.
        if (
            (nameRegex.test(inputName.value) == true) &
            (nameRegex.test(inputLastName.value) == true) &
            (emailRegex.test(inputMail.value) == true) &
            (cityRegex.test(inputCity.value) == true) &
            (adressRegex.test(inputAdress.value) == true) &
            (checkBox.checked == true)
        ) {
            // Si le formulaire est valide, le tableau productOrder contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
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
            // Création de l'entête de la requête POST pour l'envoyé au back-end
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            console.log(options);
            let priceConfirmation = document.querySelector(".totalprice").innerText;
            priceConfirmation = priceConfirmation.split(" :");
            // Envoie de la requête avec l'en-tête 
            fetch("http://localhost:3000/api/teddies/order", options)
                .then((response) => response.json())
                .then((data) => {
                    // On stock les informations reçu par le back dans le local storage 
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