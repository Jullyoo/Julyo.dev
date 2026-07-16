const MAX_TILT_DEG = 10;
const SCALE_ON_HOVER = 1.04;

export function initProjectTilt() {
    const cards = document.querySelectorAll('.project_card');
    if (!cards.length) return;

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * MAX_TILT_DEG;
            const rotateX = -((y - centerY) / centerY) * MAX_TILT_DEG;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${SCALE_ON_HOVER}, ${SCALE_ON_HOVER}, ${SCALE_ON_HOVER})`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = '';
        });
    });
}