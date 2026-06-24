export function initThemeToggle() {

    const selector = document.getElementById("themeSelector");

    if (!selector) return;

    const themes = [
        "dark-mode",
        "light-mode",
        "red-mode",
        "green-mode",
        "purple-mode",
        "contrast-mode"
    ];

    function applyTheme(theme, triggerEvent = true) {

        document.body.classList.remove(...themes);
        document.body.classList.add(theme);

        localStorage.setItem("theme", theme);

        if (triggerEvent) {
            document.dispatchEvent(
                new CustomEvent("themeChanged", {
                    detail: theme
                })
            );
        }
    }

    selector.addEventListener("change", (event) => {
        applyTheme(event.target.value);
    });

    const savedTheme =
        localStorage.getItem("theme") || "dark-mode";

    selector.value = savedTheme;

    // Aplica o tema inicial sem disparar evento
    applyTheme(savedTheme, false);
}