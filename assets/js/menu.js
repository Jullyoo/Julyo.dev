export function initMenu() {
    const toggle = document.querySelector(".menu_toggle");
    const nav = document.querySelector("header ul");

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}