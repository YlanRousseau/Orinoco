const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

main();

function main() {
    getArticles();

}

function getArticles() {
    const URL = `http://localhost:3000/api/teddies/` + id;
    fetch(URL)
        .then(data => data.json()
            .catch((error) => {
                let erreur = document.querySelector("#secContainer");
                erreur.innerHTML =
                    "Nous n'avons pas réussi à afficher nos nounours.";
                container.style.textAlign = "center";
                container.style.padding = "35vh 0";
            })
            .then(function(teddy) {
                const productTeddy = teddy;

                const cardImage = document.getElementById("productImage");
                cardImage.src = productTeddy.imageUrl;

                const productName = document.getElementById("productName");
                productName.innerHTML = productTeddy.name;

                const productPrice = document.getElementById("productPrice");
                productPrice.innerHTML = productTeddy.price / 100 + ' €';

                const productDescription = document.getElementById("productDescription");
                productDescription.innerHTML = productTeddy.description;

                for (let i = 0; i < teddy.colors.length; i++) {
                    let choix = document.createElement("option");
                    choix.innerText = teddy.colors[i];
                    productColor.appendChild(choix);
                }


                const btnAddBasket = document.querySelector("#btnAddPanier")
                btnAddBasket.addEventListener("click", () => {
                    let optionsProduct = {
                        id: productTeddy._id,
                        image: productTeddy.imageUrl,
                        name: productTeddy.name,
                        quantity: 1,
                        price: productTeddy.price / 100,
                    };

                    //--Local storage--//
                    let productSaveLocalStorage = JSON.parse(localStorage.getItem("produit"));
                    if (productSaveLocalStorage) {
                        productSaveLocalStorage.push(optionsProduct);
                        localStorage.setItem("produit", JSON.stringify(productSaveLocalStorage));

                    } else {
                        productSaveLocalStorage = [];
                        productSaveLocalStorage.push(optionsProduct);
                        localStorage.setItem("produit", JSON.stringify(productSaveLocalStorage));
                    }

                });

            }))
}