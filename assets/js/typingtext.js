const texts = [
    "Desenvolvedor Jr.",
    "Analista de Dados Jr."
];

const element = document.getElementById("typing-text");

let textIndex = 0;
let charIndex = 0;
let deleting = false;

export function animateText() {

    const currentText = texts[textIndex];

    if (!deleting) {

        element.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {

            setTimeout(() => {
                deleting = true;
                animateText();
            }, 1500);

            return;
        }

        setTimeout(animateText, 120);
    }

    else {

        element.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {

            deleting = false;
            textIndex = (textIndex + 1) % texts.length;

            setTimeout(animateText, 500);

            return;
        }

        setTimeout(animateText, 90);
    }
}

animateText();