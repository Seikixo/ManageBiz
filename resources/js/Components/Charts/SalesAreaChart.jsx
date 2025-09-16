import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CHART_CONFIG, FORMATTERS } from "@/constants/dashboard";

export default function SalesAreaChart({ data, roundMax }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                data={data}
                margin={CHART_CONFIG.areaChart.margin}
            >
                <defs>
                    <linearGradient
                        id={CHART_CONFIG.areaChart.gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor={CHART_CONFIG.areaChart.primaryColor}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor={CHART_CONFIG.areaChart.primaryColor}
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 14 }}
                />
                <YAxis
                    domain={[0, roundMax]}
                    tickFormatter={FORMATTERS.yAxisTick}
                    tick={{ fontSize: 14 }}
                />
                <Tooltip
                    contentStyle={CHART_CONFIG.tooltip.style}
                    formatter={FORMATTERS.currency}
                />
                <Area
                    type="monotone"
                    dataKey="total_sales"
                    stroke={CHART_CONFIG.areaChart.primaryColor}
                    fillOpacity={1}
                    fill={`url(#${CHART_CONFIG.areaChart.gradientId})`}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}