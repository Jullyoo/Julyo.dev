export function initTextApresentacao() {

    fetch("assets/texts/apresentacao.txt")
        .then(response => response.text())
        .then(data => {
            document.getElementById("profissional-txt").textContent = data;
        });
}

function renderInline(parent, text) {
    text.split("**").forEach((part, index) => {
        if (!part) return;

        if (index % 2 === 1) {
            const strong = document.createElement("strong");
            strong.textContent = part;
            parent.appendChild(strong);
        } else {
            parent.appendChild(document.createTextNode(part));
        }
    });
}

function renderList(element, data) {
    element.textContent = "";

    data.split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean)
        .forEach(line => {
            const li = document.createElement("li");
            renderInline(li, line);
            element.appendChild(li);
        });
}

export function initTextExperiencias() {
    const elements = document.querySelectorAll(".load-text");
    elements.forEach(element => {
        const file = element.dataset.file;
        if (!file) return;
        const asList = element.dataset.format === "list";
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar: ${file}`);
                }
                return response.text();
            })
            .then(data => {
                if (asList) {
                    renderList(element, data);
                } else {
                    element.textContent = data;
                }
            })
            .catch(error => {
                console.error(error);
                if (asList) {
                    element.textContent = "";
                    const li = document.createElement("li");
                    li.textContent = "Erro ao carregar conteúdo.";
                    element.appendChild(li);
                } else {
                    element.textContent = "Erro ao carregar conteúdo.";
                }
            });
    });
}