// obtener el elemento nav
const nav = document.getElementById("navbar");

// obtener la posición original del nav
const navOffsetTop = nav.offsetTop;

// agregar un evento de scroll al documento
document.addEventListener("scroll", () => {
  // obtener la posición actual de la página
  const scrollPosition = window.scrollY;

  // si el usuario ha hecho scroll hacia abajo más allá de la posición original del nav
  if (scrollPosition > navOffsetTop) {
    // agregar la clase "sticky" al nav
    nav.classList.add("sticky");
  } else {
    // eliminar la clase "sticky" del nav
    nav.classList.remove("sticky");
  }
});
