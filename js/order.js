main();

function main() {
    displayOrderInfo();
}

function displayOrderInfo() {
    const totalConfirmation = localStorage.getItem('total');
    const orderId = localStorage.getItem('orderId');

    document.querySelector('.totalprice span').innerHTML = totalConfirmation;
    document.querySelector('.orderId span').innerHTML = orderId;

    localStorage.clear();
}