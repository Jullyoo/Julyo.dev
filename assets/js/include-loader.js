async function loadInclude(el) {
    const file = el.getAttribute('data-include');
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const html = await response.text();
        el.outerHTML = html;
    } catch (err) {
        console.error(`Falha ao carregar partial "${file}":`, err);
        el.outerHTML = `<!-- erro ao carregar ${file} -->`;
    }
}

async function loadAllIncludes() {
    const includeEls = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(includeEls.map(loadInclude));
}

loadAllIncludes()
    .then(() => {
        document.dispatchEvent(new CustomEvent('partials:loaded'));
        // Só importa o script principal depois que o HTML real já está no DOM.
        return import('./index.js');
    })
    .then(() => {
        document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true, cancelable: true }));
    })
    .catch((err) => {
        console.error('Erro ao montar a página a partir dos partials:', err);
    });