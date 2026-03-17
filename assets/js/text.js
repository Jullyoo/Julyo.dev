export function initTextApresentacao() {
    fetch("assets/texts/apresentacao.txt")
        .then(response => response.text())
        .then(data => {
            document.getElementById("text").textContent = data;
        })
        .catch(error => console.error("Erro ao carregar o texto:", error));
}

export function initTextExperiencias() {

    const elements = document.querySelectorAll(".load-text");

    elements.forEach(element => {

        const file = element.dataset.file;

        if (!file) return;

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar: ${file}`);
                }
                return response.text();
            })
            .then(data => {
                element.textContent = data;
            })
            .catch(error => {
                console.error(error);
                element.textContent = "Erro ao carregar conteúdo.";
            });

    });

}