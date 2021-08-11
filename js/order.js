main();

function main() {
    displayOrderInfo();
}
// Résumé de la commande affichant des informations stocker dans local storage suite à la requête POST 
function displayOrderInfo() {
    const totalConfirmation = localStorage.getItem('total');
    const orderId = localStorage.getItem('orderId');

    document.querySelector('.totalprice span').innerHTML = totalConfirmation;
    document.querySelector('.orderId span').innerHTML = orderId;

    localStorage.clear();
}