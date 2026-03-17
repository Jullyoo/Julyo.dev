export function initHeader() {
    const header = document.getElementById("header");
    const aboutSection = document.querySelector(".about_section");

    if (!header || !aboutSection) return;

    window.addEventListener("scroll", () => {
        const triggerPoint = aboutSection.offsetTop - header.offsetHeight;

        if (window.scrollY >= triggerPoint) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}