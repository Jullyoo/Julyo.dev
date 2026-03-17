const particleThemes = {

    "dark-mode": "#00bcd4",
    "light-mode": "#00bcd4",
    "red-mode": "#ff4d4d",
    "green-mode": "#00ff9d",
    "purple-mode": "#c084ff",
    "contrast-mode": "#ffff00"

};

let currentColor = particleThemes["dark-mode"];

export function initParticles(theme = "dark-mode") {

    const newColor = particleThemes[theme] || "#00bcd4";

    animateParticleColor(currentColor, newColor);

    currentColor = newColor;

    if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    particlesJS("particles-js", {

        particles: {

            number: {
                value: 80,
                density: { enable: true, value_area: 800 }
            },

            color: { value: newColor },

            shape: { type: "circle" },

            opacity: {
                value: 0.6
            },

            size: {
                value: 3,
                random: true
            },

            line_linked: {
                enable: true,
                distance: 150,
                color: newColor,
                opacity: 0.4,
                width: 1
            },

            move: {
                enable: true,
                speed: 2.5,
                out_mode: "out"
            }

        },

        interactivity: {

            detect_on: "canvas",

            events: {

                onhover: {
                    enable: true,
                    mode: "repulse"
                },

                onclick: {
                    enable: true,
                    mode: "push"
                },

                resize: true
            },

            modes: {

                repulse: {
                    distance: 120
                },

                push: {
                    particles_nb: 4
                }

            }

        }

    });

}


document.addEventListener("themeChanged", (event) => {
    initParticles(event.detail);
});

function animateParticleColor(oldColor, newColor) {

    const container = document.getElementById("particles-js");

    container.style.transition = "filter 0.6s ease";

    container.style.filter = "brightness(0.7)";

    setTimeout(() => {
        container.style.filter = "brightness(1)";
    }, 300);

}
