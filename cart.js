let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
function readCart(cart) {
  document.querySelector("#cart").innerHTML = "";
  let totalPrice = 0;
  cart.forEach((cart, position) => {
    document.querySelector("#cart").innerHTML += `
    <div class="card" style="width:600px">
        <img src="${cart.img}" class="card-img-top" alt="${cart.title}">
        <div class="card-body">
          <h5 class="card-title">${cart.title}</h5>
          <p class="card-text">R${cart.price * cart.qty}</p>
          <p class="card-text">Quantity:${cart.qty}</p>
          <button type="button" class="btn btn-primary" onclick="removeProduct(${position})" >
            Clear cart
          </button>
          </div>
          </div>
    `;
    totalPrice += cart.price * cart.qty;
  });
  document.querySelector(
    "#total"
  ).innerHTML = `<p style="color: brown; font-size: larger;">Subtotal:R${totalPrice}</p>`;
}

// Removeproduct

// SORTPRICE
function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = cart.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "Descending") sortedProducts.reverse();
  readCart(sortedProducts);
}

// SORTNAME
function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = cart.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readCart(cart);
}

// REMOVE ALL
function checkOut() {
  let confirmation = confirm("Are you sure you want to check out");

  let number = cart.length;

  if (confirmation) {
    cart.splice(0, number);
    localStorage.setItem("cart", JSON.stringify(cart));
    readCart(cart);
  }
}
readCart(cart);
console.log(cart);

// REMOVE ONE OBJECT

function removeProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    cart.splice(position, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    readCart(cart);
  }
}
readCart(cart);
console.log(cart);
