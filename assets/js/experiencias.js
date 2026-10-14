export function initExperiencias() {
    const root = document.querySelector("[data-exp]");
    if (!root || root.dataset.expReady) return;

    const timeline = root.querySelector("[data-timeline]");
    const items = Array.from(root.querySelectorAll(".tl-item"));
    if (!timeline || !items.length) return;

    root.dataset.expReady = "1";
    root.classList.add("exp--js");

    const chips = Array.from(root.querySelectorAll("[data-filter]"));
    const statusEl = root.querySelector("[data-filter-status]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const monthIndex = (ym) => {
        const [year, month] = ym.split("-").map(Number);
        return year * 12 + (month - 1);
    };

    const today = new Date();
    const todayIndex = today.getFullYear() * 12 + today.getMonth();

    const formatDuration = (months) => {
        const years = Math.floor(months / 12);
        const rest = months % 12;
        const parts = [];
        if (years) parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
        if (rest) parts.push(`${rest} ${rest === 1 ? "mês" : "meses"}`);
        return parts.join(" e ");
    };

    items.forEach((item) => {
        const target = item.querySelector("[data-duration]");
        const { start, end } = item.dataset;
        if (!target || !start || !end) return;

        const endIndex = end === "present" ? todayIndex : monthIndex(end);
        if (endIndex > todayIndex) return;

        const months = endIndex - monthIndex(start) + 1;
        if (months > 0) target.textContent = formatDuration(months);
    });

    let marks = [];
    let railTop = 0;
    let railHeight = 0;
    let queued = false;

    function measure() {
        marks = items
            .filter((item) => !item.hidden)
            .map((item) => {
                const node = item.querySelector(".tl-node");
                return { item, y: item.offsetTop + node.offsetTop + node.offsetHeight / 2 };
            });
        if (!marks.length) return;

        railTop = marks[0].y;
        railHeight = Math.max(0, marks[marks.length - 1].y - railTop);
        timeline.style.setProperty("--line-top", `${railTop}px`);
        timeline.style.setProperty("--line-h", `${railHeight}px`);
        update();
    }

    function update() {
        queued = false;
        if (!marks.length) return;

        let reach = Infinity;
        if (!reduceMotion) {
            const rect = timeline.getBoundingClientRect();
            const vh = window.innerHeight;
            reach = vh * 0.6 - rect.top - railTop;

            const atPageEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 2;
            if (atPageEnd && rect.top < vh && rect.bottom > 0) reach = Infinity;
        }

        const progress = railHeight ? Math.min(Math.max(reach, 0), railHeight) / railHeight : 0;
        timeline.style.setProperty("--p", progress.toFixed(4));
        timeline.classList.toggle("is-flowing", progress > 0.002 && progress < 0.998);

        marks.forEach(({ item, y }) => {
            item.classList.toggle("is-active", reach >= y - railTop);
        });
    }

    function requestUpdate() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
    }

    const filterLabels = {
        all: "todas as experiências e formações",
        work: "experiências profissionais",
        edu: "formações",
    };

    const matches = (item, filter) => filter === "all" || item.dataset.type === filter;

    chips.forEach((chip) => {
        const counter = chip.querySelector(".exp-chip__count");
        if (counter) counter.textContent = items.filter((i) => matches(i, chip.dataset.filter)).length;
    });

    let currentFilter = "all";

    function applyFilter(filter) {
        if (filter === currentFilter) return;
        currentFilter = filter;

        chips.forEach((chip) => {
            chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
        });

        const finish = () => {
            items.forEach((item) => { item.hidden = !matches(item, filter); });
            measure();
            timeline.classList.remove("is-switching");
        };

        if (statusEl) statusEl.textContent = `Mostrando ${filterLabels[filter]}.`;

        if (reduceMotion) {
            finish();
        } else {
            timeline.classList.add("is-switching");
            window.setTimeout(finish, 200);
        }
    }

    root.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-filter]");
        if (chip && root.contains(chip)) applyFilter(chip.dataset.filter);
    });

    measure();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", measure);

    if ("ResizeObserver" in window) new ResizeObserver(measure).observe(timeline);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
}