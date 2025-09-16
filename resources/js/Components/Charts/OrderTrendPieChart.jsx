import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { CHART_CONFIG, FORMATTERS } from "@/constants/dashboard";

export default function OrderTrendPieChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="number_of_orders"
                    nameKey="name"
                >
                    <LabelList
                        dataKey="name"
                        position="inside"
                        fontSize={CHART_CONFIG.pieChart.fontSize}
                        stroke="none"
                        className="fill-black"
                    />
                </Pie>
                <Tooltip
                    contentStyle={CHART_CONFIG.tooltip.style}
                    formatter={FORMATTERS.orders}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}