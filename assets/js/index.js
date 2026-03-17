import { initThemeToggle } from "./tema.js";
import { initScrollAnimation } from "./scroll.js";
import { initParticles } from "./particles.js";
import { initHeader } from "./header.js";
import { initTextApresentacao } from "./text.js";
import { initMenu } from "./menu.js";
import { initTextExperiencias } from "./text.js";
import { initProjectModal, initServiceModal, initTechModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initHeader();
    initThemeToggle();
    initScrollAnimation();   
    initTextApresentacao();
    initProjectModal();
    initMenu();
    initTextExperiencias();
    initTechModal();
    initServiceModal();
});

initThemeToggle();

const savedTheme = localStorage.getItem("theme") || "dark-mode";
initParticles(savedTheme);