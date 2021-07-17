  main();

  function main() {
      getArticles();
  }

  function getArticles() {
      fetch('http://localhost:3000/api/teddies/')
          .then(data => data.json()
              .then(teddies => {
                  addArticles(teddies);
                  console.log(teddies);
              })
              .catch((error) => {
                  let productContainer = document.querySelector('#product-container');
                  productContainer.innerHTML += 'Oups il semble il y avoir une erreur, réessayer ulterieurement.';
                  productContainer.style.textAlign = "center";
                  productContainer.style.padding = "10rem 0";
              }))
  }

  function addArticles(teddies) {
      for (let teddy of teddies) {
          document.querySelector('#liste').innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-6 pb-3 ">
                <div class="card border bg-light shadow p-3 mb-5 mx-3 my-3 bg-body rounded">
                    <div class="card-body">
                        <div class="row">
                            <a href="/frontend/produit.html?id=${teddy._id}"><img src="${teddy.imageUrl}" class="img-fluid p-1" alt="${teddy.name}"></a>
                            <div class="col-6 col-sm-7 mt-3">
                                <h5 class="card-title">${teddy.name}</h5>
                            </div>
                            <div class="col-6 col-sm-5 mt-3 text-end ">
                                <h5 class="card-title">${teddy.price/100},00€</h5>
                            </div>
                        </div>
                        <a href="/frontend/produit.html?id=${teddy._id}" class="btn btn-primary">Ajouter au panier</a>
                    </div>
                </div>
            </div>
        </div>  `

      }
  }