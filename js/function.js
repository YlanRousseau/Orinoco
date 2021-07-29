function basketNumb() {
    const basket = JSON.parse(localStorage.getItem("produit")) || [];
    if (basket.length == 0) {} else {
        let basketNumbPreview = document.getElementById("cartNumber");
        let calculBasketPreview = 0;
        for (product of basket) {
            calculBasketPreview += parseInt(product.quantity);
        }
        basketNumbPreview.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto basketNumb">${calculBasketPreview}</span>`;
    }
}