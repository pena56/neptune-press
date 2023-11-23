const navbar = document.querySelector("nav");
const navbarLogo = document.querySelector("#navbar-logo");
const navbarCoral = document.querySelector("#navbar-coral");
const menuButton = document.querySelector("#hamburger");

if (navbar.classList.contains("show-transparent")) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("fixed");
      navbarLogo.src = "./assets/images/logo-dark.png";
      navbarCoral.src = "./assets/images/coral-dark.svg";
      menuButton.fill = "#134153";
    } else {
      navbar.classList.remove("fixed");
      navbarLogo.src = "./assets/images/logo.png";
      navbarCoral.src = "./assets/images/coral.svg";
      menuButton.fill = "#EEF8FB";
    }
  });
} else {
  navbar.classList.add("fixed");
  navbarLogo.src = "./assets/images/logo-dark.png";
  navbarCoral.src = "./assets/images/coral-dark.svg";
  menuButton.fill = "#EEF8FB";
}
