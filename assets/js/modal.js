export function initProjectModal() {
    const cards = document.querySelectorAll(".project_card");
    const modal = document.getElementById("projectModal");

    const modalTitle = document.getElementById("projectModalTitle");
    const modalDescription = document.getElementById("projectModalDescription");
    const modalTech = document.getElementById("projectModalTech");
    const modalLink = document.getElementById("projectModalLink");
    const closeModal = modal.querySelector(".close_modal");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            modalTech.textContent = card.dataset.tech;
            modalLink.href = card.dataset.link;

            modal.classList.add("active");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

export function initTechModal() {

    const cards = document.querySelectorAll(".tech_card");
    const modal = document.getElementById("techModal");

    const modalTitle = document.getElementById("techModalTitle");
    const modalCourses = document.getElementById("techModalCourses");
    const modalExperience = document.getElementById("techModalExperience");
    const modalProjects = document.getElementById("techModalProjects");

    const closeModal = modal.querySelector(".close_modal");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            modalTitle.textContent = card.dataset.title;
            modalCourses.textContent = card.dataset.courses || "Não informado";
            modalExperience.textContent = card.dataset.experience || "Não informado";
            modalProjects.textContent = card.dataset.projects || "Não informado";

            modal.classList.add("active");

        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

}

export function initServiceModal() {

    const cards = document.querySelectorAll(".service_card");
    const modal = document.getElementById("serviceModal");

    const modalTitle = document.getElementById("serviceModalTitle");
    const modalDescription = document.getElementById("serviceModalDescription");
    const modalTech = document.getElementById("serviceModalTech");

    const closeModal = modal.querySelector(".close_modal");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            modalTech.textContent = card.dataset.tech;

            modal.classList.add("active");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

}