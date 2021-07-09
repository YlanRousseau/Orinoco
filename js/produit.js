const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const URL = `http://localhost:3000/api/teddies/` + id;
fetch(URL)
    .then(data => data.json()
        .then(teddy => {
            console.log(teddy);

            const cardImage = document.getElementById("productImage");
            cardImage.innerHTML = `<img src="${teddy.imageUrl}" class="img-thumbnail" alt="Norbert">`;

            const productName = document.getElementById("productName");
            productName.innerHTML = `<h5>${teddy.name}</h5>`;

            const productPrice = document.getElementById("productPrice");
            productPrice.innerHTML = `<h5>${teddy.price/100}€</h5>`;

            const productDescription = document.getElementById("productDescription");
            productDescription.innerHTML = `<p>${teddy.description}</p>`;

        }));