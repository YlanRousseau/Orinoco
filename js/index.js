  (async function() {
      const teddies = await getTeddies()
      for (teddy of teddies) {
          displayTeddy(teddy)
      }
      basketNumb()
  })()

  /* Appeler les données via API */
  function getTeddies() {
      return fetch("http://localhost:3000/api/teddies")
          .then((responseHttp) => responseHttp.json())
  }

  /* Récupérer les informations contenues dans le tableau*/
  function displayTeddy(teddy) {
      console.log(teddy);
      const templateElt = document.getElementById('template');
      const cloneElt = document.importNode(templateElt.content, true)

      cloneElt.getElementById('imgTeddy').src = teddy.imageUrl;
      cloneElt.getElementById('teddyName').innerHTML = teddy.name;
      cloneElt.getElementById('teddyPrice').innerHTML = teddy.price / 100 + ",00  €";
      cloneElt.querySelector('.btnTeddy').href = `/frontend/produit.html?id=${teddy._id}`;
      cloneElt.getElementById('btnTeddy').href = `/frontend/produit.html?id=${teddy._id}`;
      document.getElementById('liste').appendChild(cloneElt);
  }

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