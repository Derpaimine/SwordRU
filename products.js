let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "Enma (Onepiece)",
        category: "Katana",
        price: 1300.0,
        img: "https://cdn.webshopapp.com/shops/305440/files/334090145/image.jpg",
      },
      {
        title: "Zangetsu (Bleach)",
        category: "Katana",
        price: 700.0,
        img: "https://cdn.webshopapp.com/shops/305440/files/334089935/image.jpg",
      },
      {
        title: "Genji Sword (Overwatch)",
        category: "Fruit",
        price: 900.0,
        img: "https://i5.walmartimages.com/asr/d586cd46-1af4-449f-9e70-47b030d558a4.702f7f82b2c85013afa39f5465418c2a.jpeg",
      },
      {
        title: "grapes",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/SKw2Cq2K/grapes.jpg",
      },
      {
        title: "kiwi",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/43TbRzPP/Kiwi-Fruit.jpg",
      },
      {
        title: "oranges",
        category: "Fruit",
        price: 9.99,
        img: "https://i.postimg.cc/5NKQm8Dy/Oranges.jpg",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `

      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          
          <p class="card-text">R${product.price}</p>

           <label for="addImg" class="form-label">Quantity</label>

                        <input
                          class="form-control"
                          type="number"
                          name="addImg"
                          id="addCart${position}"
                          min="1"
                          value="1"
                        />


          <button type="button" class="btn btn-primary" onclick="addCart(${position})" >
            Add to cart
          </button>


          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
            Edit
          </button>
          <button type="button" class="btn btn-danger" onclick="deleteProduct(${position})" >
            Delete
          </button>

           
              <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Katana">Katana</option>
                          <option value="Dagger">Dagger</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
  });
}

readProducts(products);

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// ADDCART
function addCart(postion) {
  let qty = document.querySelector(`#addCart${postion}`).value;
  cart.push({
    ...products[postion],
    qty,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// SORTPRICE
function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "Descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}

// SORTNAME
function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
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
  readProducts(products);
}


// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}
