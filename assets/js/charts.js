let charts = [];

const chartThemes = {
    "dark-mode": "#3B82F6",
    "light-mode": "#2563EB",
    "red-mode": "#EF4444",
    "green-mode": "#22C55E",
    "purple-mode": "#A855F7",
    "contrast-mode": "#FFD700"
};

function getThemeColor() {
    const body = document.body;

    for (const theme in chartThemes) {
        if (body.classList.contains(theme)) {
            return chartThemes[theme];
        }
    }

    return "#3B82F6";
}

function getThemeColors() {
    const primary = getThemeColor();

    return {
        primary,
        transparent: primary + "33",
        grid: "rgba(255,255,255,0.08)",
        text: "#E5E7EB"
    };
}

export function destroyCharts() {
    charts.forEach(chart => chart.destroy());
    charts = [];
}

export function initCharts() {
    destroyCharts();

    const colors = getThemeColors();

    Chart.defaults.color = colors.text;
    Chart.defaults.borderColor = colors.grid;
    Chart.defaults.font.family = "Inter, sans-serif";

    createTechChart(colors);
    createCategoryChart(colors);
    createEvolutionChart(colors);
    createProblemChart(colors);
}

function createTechChart(colors) {

    const chart = new Chart(
        document.getElementById("techChart"),
        {
            type: "bar",
            data: {
                labels: [
                    "Python",
                    "Power BI",
                    "JavaScript",
                    "React",
                    "SQL",
                    "HTML/CSS",
                    "Excel"
                ],
                datasets: [{
                    data: [10, 6, 5, 2, 6, 6, 4],
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                animation: {
                    duration: 1200
                },

                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );

    charts.push(chart);
}

function createCategoryChart(colors) {

    const chart = new Chart(
        document.getElementById("categoryChart"),
        {
            type: "doughnut",

            data: {
                labels: [
                    "Dados",
                    "Web",
                    "Automação",
                    "BI"
                ],

                datasets: [{
                    data: [10, 6, 4, 2],

                    backgroundColor: [
                        "#3B82F6",
                        "#22C55E",
                        "#F59E0B",
                        "#EF4444"
                    ],

                    borderWidth: 0,
                    hoverOffset: 12
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                cutout: "48%",

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    );

    charts.push(chart);
}

function createEvolutionChart(colors) {

    const chart = new Chart(
        document.getElementById("evolutionChart"),
        {
            type: "line",

            data: {
                labels: [
                    "2023",
                    "2024",
                    "2025",
                    "2026"
                ],

                datasets: [{
                    data: [1, 1, 6, 14],

                    borderColor: colors.primary,
                    backgroundColor: colors.transparent,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    );

    charts.push(chart);
}

function createProblemChart(colors) {

    const chart = new Chart(
        document.getElementById("problemChart"),
        {
            type: "bar",

            data: {
                labels: [
                    "ETL",
                    "BI",
                    "Automação",
                    "APIs",
                    "Front-End",
                    "Back-End"
                ],

                datasets: [{
                    data: [8, 6, 5, 2, 6, 3],

                    backgroundColor: colors.primary,

                    borderRadius: 10
                }]
            },

            options: {
                indexAxis: "y",

                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    );

    charts.push(chart);
}

document.addEventListener("themeChanged", () => {
    initCharts();
});