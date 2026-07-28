// ---------- Helpers ----------

/**
 * Splits a "|"-separated string (from a data-attribute) into a <ul> of <li>.
 * "|" is used instead of "," because course/experience/tech text often
 * contains natural commas (e.g. "Python (Flask, Django)"), which would
 * otherwise get split in the wrong place.
 * Falls back to a single italic "empty" item when there's nothing to show.
 */
function fillList(container, rawText, emptyMessage = "Não informado") {
    container.innerHTML = "";
    const items = (rawText || "")
        .split("|")
        .map(item => item.trim())
        .filter(Boolean);

    if (items.length === 0) {
        const li = document.createElement("li");
        li.textContent = emptyMessage;
        li.classList.add("empty");
        container.appendChild(li);
        return;
    }

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        container.appendChild(li);
    });
}

/**
 * Splits a "|"-separated string into pill-style tags.
 */
function fillTags(container, rawText, emptyMessage = "Não informado") {
    container.innerHTML = "";
    const items = (rawText || "")
        .split("|")
        .map(item => item.trim())
        .filter(Boolean);

    if (items.length === 0) {
        const span = document.createElement("span");
        span.textContent = emptyMessage;
        span.classList.add("modal_tag_empty");
        container.appendChild(span);
        return;
    }

    items.forEach(item => {
        const tag = document.createElement("span");
        tag.classList.add("modal_tag");
        tag.textContent = item;
        container.appendChild(tag);
    });
}

/**
 * Wires up the shared behaviors every modal needs:
 * close button, click outside the modal_content, and Esc key.
 */
function bindModalClose(modal) {
    const closeModal = modal.querySelector(".close_modal");

    const close = () => modal.classList.remove("active");

    closeModal.addEventListener("click", close);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) close();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("active")) {
            close();
        }
    });
}

// ---------- Modals ----------

export function initProjectModal() {
    const cards = document.querySelectorAll(".project_card");
    const modal = document.getElementById("projectModal");

    const modalTitle = document.getElementById("projectModalTitle");
    const modalDescription = document.getElementById("projectModalDescription");
    const modalTech = document.getElementById("projectModalTech");
    const modalLink = document.getElementById("projectModalLink");

    bindModalClose(modal);

    cards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            fillTags(modalTech, card.dataset.tech);
            modalLink.href = card.dataset.link;

            modal.classList.add("active");
        });
    });
}

export function initTechModal() {
    const cards = document.querySelectorAll(".tech_card");
    const modal = document.getElementById("techModal");

    const modalTitle = document.getElementById("techModalTitle");
    const modalCourses = document.getElementById("techModalCourses");
    const modalExperience = document.getElementById("techModalExperience");
    const modalProjects = document.getElementById("techModalProjects");

    bindModalClose(modal);

    cards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.textContent = card.dataset.title;
            fillList(modalCourses, card.dataset.courses);
            fillList(modalExperience, card.dataset.experience);
            fillTags(modalProjects, card.dataset.projects);

            modal.classList.add("active");
        });
    });
}

export function initServiceModal() {
    const cards = document.querySelectorAll(".service_card");
    const modal = document.getElementById("serviceModal");

    const modalTitle = document.getElementById("serviceModalTitle");
    const modalDescription = document.getElementById("serviceModalDescription");
    const modalTech = document.getElementById("serviceModalTech");

    bindModalClose(modal);

    cards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            fillTags(modalTech, card.dataset.tech);

            modal.classList.add("active");
        });
    });
}