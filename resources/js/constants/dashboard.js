export const CHART_COLORS = [
    "#f87171", // red-400
    "#34d399", // emerald-400
    "#2dd4bf", // teal-400
    "#22d3ee", // cyan-400
    "#38bdf8", // sky-400
    "#60a5fa", // blue-400
    "#818cf8", // indigo-400
    "#a78bfa", // violet-400
    "#c084fc", // purple-400
    "#e879f9", // fuchsia-400
    "#f472b6", // pink-400
    "#fb7185", // rose-400
];

export const CHART_CONFIG = {
    barChart: {
        margin: { top: 10, right: 10, left: 0, bottom: 0 },
        barSize: 60,
        radius: 4,
    },
    areaChart: {
        margin: { top: 10, right: 10, left: 0, bottom: 0 },
        gradientId: "colorSales",
        primaryColor: "#818cf8",
    },
    pieChart: {
        fontSize: 12,
    },
    tooltip: {
        style: { borderRadius: "4px" },
    },
};

export const FORMATTERS = {
    currency: (value) => `₱${Number(value).toLocaleString()}`,
    items: (value) => `${value} items`,
    orders: (value) => `${value} orders`,
    yAxisTick: (value) => (value >= 1000 ? `${value / 1000}k` : value),
};
