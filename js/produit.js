const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
basketNumb()
main();

function main() {
    getArticles();
    if404();
}
// On récupère uniquement le produit dont on a besoin via le paramètre dans la requête
function getArticles() {
    const URL = `http://localhost:3000/api/teddies/` + id;
    fetch(URL)
        .then(data => data.json()
            .catch((error) => {
                let erreur = document.querySelector("#secContainer");
                erreur.innerHTML =
                    "Nous n'avons pas réussi à afficher nos nounours.";
                erreur.style.textAlign = "center";
                erreur.style.padding = "35vh 0";
            })
            // On place les données reçues via l'API aux bons endroits sur la page
            .then(function displayArticles(teddy) {
                const productTeddy = teddy;
                document.getElementById("productImage").src = productTeddy.imageUrl;
                document.getElementById("productName").innerHTML = productTeddy.name;
                document.getElementById("productPrice").innerHTML = productTeddy.price / 100 + ',00 €';
                document.getElementById("productDescription").innerHTML = productTeddy.description;

                //Boucle pour afficher les choix de couleur du l'article 
                for (let i = 0; i < teddy.colors.length; i++) {
                    let choix = document.createElement("option");
                    choix.innerText = teddy.colors[i];
                    productColor.appendChild(choix);
                }
                var btnAddBasket = document.querySelector("#btnAddPanier");
                btnAddBasket.addEventListener("click", () => {
                    addProductInBasket(getBasketProduct(productTeddy), parseInt(document.getElementById("productQuantity").value));
                    document.location.reload();
                });
            }));
}


// Création et ajout du produit dans le local storage si celui-ci est vide ou augmentation de ça quantité  
function addProductInBasket(basketProduct, addQuantity) {
    let basket = JSON.parse(localStorage.getItem("produit"));
    if (basket == null) basket = [];
    if (isProductInBasket(basket, basketProduct.id)) {
        for (var i = 0; i < basket.length; i++) {
            var tmp = basket[i];
            if (tmp.id == basketProduct.id) {
                tmp.quantity += addQuantity;
            }
        }
    } else {
        basketProduct.quantity = addQuantity;
        basket.push(basketProduct);
    }
    localStorage.setItem("produit", JSON.stringify(basket));
}

function isProductInBasket(basket, productId) {
    for (var i = 0; i < basket.length; i++) {
        var basketProduct = basket[i];
        if (basketProduct.id == productId) {
            return true;
        }
    }
    return false;
}
// Création du produit qui sera ajouté au panier 
function getBasketProduct(teddy) {
    let basketProduct = {
        id: teddy._id,
        image: teddy.imageUrl,
        name: teddy.name,
        price: teddy.price
    };
    return basketProduct;
}

function if404() {
    window.addEventListener("error", (e) => {
            let erreur = document.querySelector("#secContainer");
            erreur.innerHTML =
                "Nous n'avons pas réussi à afficher nos nounours.";
            erreur.style.textAlign = "center";
            erreur.style.padding = "35vh 0";
        },
        true
    );
}