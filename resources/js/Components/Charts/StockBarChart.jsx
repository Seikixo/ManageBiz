import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { CHART_CONFIG, FORMATTERS } from "@/constants/dashboard";

export default function StockBarChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                layout="vertical"
                margin={CHART_CONFIG.barChart.margin}
            >
                <XAxis type="number" tick={{ fontSize: 14 }} />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip
                    contentStyle={CHART_CONFIG.tooltip.style}
                    formatter={FORMATTERS.items}
                />
                <Bar
                    dataKey="product_stocks"
                    fill={CHART_CONFIG.areaChart.primaryColor}
                    radius={CHART_CONFIG.barChart.radius}
                    barSize={CHART_CONFIG.barChart.barSize}
                >
                    <LabelList
                        dataKey="name"
                        position="insideLeft"
                        fontSize={CHART_CONFIG.pieChart.fontSize}
                        stroke="none"
                        className="fill-black"
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
