  fetch('http://localhost:3000/api/teddies/')
      .then(data => data.json()
          .then(teddies => {
              console.log(teddies);

              for (let teddy of teddies) {
                  document.querySelector('#liste').innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-6 pb-3 ">
                <div class="card border bg-light shadow p-3 mb-5 mx-3 my-3 bg-body rounded">
                    <div class="card-body">
                        <div class="row">
                            <a href="/frontend/produit.html"><img src="${teddy.imageUrl}" class="img-fluid p-1" alt="${teddy.name}"></a>
                            <div class="col-6 col-sm-7 mt-3">
                                <h5 class="card-title">${teddy.name}</h5>
                            </div>
                            <div class="col-6 col-sm-5 mt-3 text-end ">
                                <h5 class="card-title">${teddy.price/100}€</h5>
                            </div>
                        </div>
                        <a href="/frontend/produit.html" class="btn btn-primary">Ajouter au panier</a>
                    </div>
                </div>
            </div>
        </div>  `

              }
          }));