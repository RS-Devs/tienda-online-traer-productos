 // Obtener referencias a los elementos necesarios
 const openCart = document.getElementById("open-cart");
 const cartModal = document.getElementById("cart-modal");
 const closeBtn = document.querySelector(".close");
 const cartList = document.getElementById("cart-list");
 const cartTotal = document.getElementById("cart-total");

 // Agregar evento "click" al botón para mostrar el modal
 openCart.addEventListener("click", function() {
   cartModal.style.display = "block";
 });

 // Agregar evento "click" al botón para cerrar el modal
 closeBtn.addEventListener("click", function() {
   cartModal.style.display = "none";
 });

 // Agregar evento para cerrar el modal si el usuario hace click fuera de él
 window.addEventListener("click", function(event) {
   if (event.target == cartModal) {
     cartModal.style.display = "none";
   }
 });
 
 // Función para actualizar el contenido del carrito en el modal
 function updateCart(cart) {
   let cartHTML = "";
   let total = 0;
   for (let i = 0; i < cart.length; i++) {
     cartHTML += `
       <li>
         <img src="${cart[i].imagen}" alt="${cart[i].nombre}">
         <div>
           <h4>${cart[i].nombre}</h4>
           <p>Precio: €${cart[i].precio.toFixed(2)}</p>
         </div>
       </li>
     `;
     total += cart[i].precio;
   }
   cartList.innerHTML = cartHTML;
   cartTotal.innerHTML = total.toFixed(2);
 }

 // Función para obtener el carrito desde Local Storage y actualizar el contenido del modal
 function showCart() {
   let cart = JSON.parse(localStorage.getItem("carrito")) || [];
   updateCart(cart);
 }

 // Mostrar el contenido del carrito cuando se carga la página
 showCart();