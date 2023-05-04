const checkoutBtn = document.getElementById("checkout");
const clearCartBtn = document.getElementById("clearCart");
const productBtns = document.querySelectorAll(".button-add");
let productList = [];
let cart = [];
let total = 0;

function addProduct(id, price, name) {
  const product = name;
  cart.push(product);
  total += price;
  checkoutBtn.textContent = `Pagar €${total}`;
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  const productHTML = `<li>${product} - €${price} <button id="rmProduct" style=" background-color:transparent; border:none;" alt="Eliminar Carrito" onclick="removeProduct(${cart.indexOf(
    product
  )}, ${price})"><img style="width:1rem;height:1rem;" src="https://cdn-icons-png.flaticon.com/512/957/957192.png" alt="Eliminar Carrito"></button></li>
  `;
  cartList.innerHTML += productHTML;
  cartTotal.textContent = total;

  const product1 = productList.find((p) => p.id === id);
  if (product1 && product1.stock) {
    product1.stock--;
  } else {
    console.error(`Producto no encontrado o sin stock: ${name}`);
  }
}

function removeProduct(index, price) {
  cart.splice(index, 1);
  total -= price;
  checkoutBtn.textContent = `Pagar €${total}`;
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  const productToRemove = cartList.children[index];
  cartList.removeChild(productToRemove);
  cartTotal.textContent = total;
}

function clearCart() {
  cart = [];
  total = 0;
  checkoutBtn.textContent = `Pagar €${total}`;
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  cartList.innerHTML = "";
  cartTotal.textContent = total;
}

async function pay() {
  try {
    const productsToBuy = cart.reduce((acc, product) => {
      const productInfo = productList.find(p => p.name === product);
      if (productInfo) {
        acc.push({
          product: productInfo.name,
          quantity: cart.filter(p => p === product).length,
        });
      }
      return acc;
    }, []);

    const response = await fetch('/api/products/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productsToBuy),
    });
    const data = await response.json();

    clearCart();
    alert(data);
  } catch (error) {
    console.error(error);
  }
}


productBtns.forEach((btn) => btn.addEventListener("click", addProduct));
checkoutBtn.addEventListener("click", pay);
clearCartBtn.addEventListener("click", clearCart);

const displayProducts = (productsList) => {
  let productsHTML = "";
  productsList.forEach((p) => {
    productList.push(p);

    let buttonHTML = `<button class="button-add" data-product="${p.name}" data-price="${p.price}" onclick="addProduct(${p.id}, ${p.price}, '${p.name}')">Agregar</button>`;

    if (p.stock <= 0) {
      buttonHTML = `<button disabled class="button-add" data-product="${p.name}" data-price="${p.price}" onclick="addProduct(${p.id}, ${p.price}, '${p.name}')">Agregar</button>`;
    }

    productsHTML += `<div class="product-container">
    <h2>${p.name}</h2>
    <img src="${p.image}">
    <h3 class="price">€${p.price}</h3>
    ${buttonHTML}
    </div>`;
  });
  document.getElementById("page-content").innerHTML = productsHTML;
};

window.onload = async () => {
  productList = await (await fetch("/api/products")).json();
  console.log(productList);
  displayProducts(productList);
};
