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

    const themeConfig = {
        "dark-mode": {
            logo: "assets/images/png/Julyo_dev_logo_azul.png"
        },

        "light-mode": {
            logo: "assets/images/png/Julyo_dev_logo_azul.png"
        },

        "green-mode": {
            logo: "assets/images/png/Julyo_dev_logo_verde.png"
        },

        "red-mode": {
            logo: "assets/images/png/Julyo_dev_logo_vermelho.png"
        },

        "purple-mode": {
            logo: "assets/images/png/Julyo_dev_logo_roxo.png"
        },

        "contrast-mode": {
            logo: "assets/images/png/Julyo_dev_logo_amarelo.png"
        }
    };

    function updateThemeAssets(theme) {

        const config = themeConfig[theme];

        if (!config) return;

        const logo = document.getElementById("logoImg");

        if (logo && config.logo) {
            logo.src = config.logo;
        }
    }

    function applyTheme(theme, triggerEvent = true) {

        document.body.classList.remove(...themes);
        document.body.classList.add(theme);

        localStorage.setItem("theme", theme);

        updateThemeAssets(theme);

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

    const savedTheme = localStorage.getItem("theme") || "dark-mode";

    selector.value = savedTheme;

    applyTheme(savedTheme, false);
}