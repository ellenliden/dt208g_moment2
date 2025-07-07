// Hamburger-menylogik
const hamburger = document.querySelector(
  ".hamburger"
) as HTMLButtonElement | null;
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
