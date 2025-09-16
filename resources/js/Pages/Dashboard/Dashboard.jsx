import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import MainLayout from "@/Layouts/MainLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    ChartNoAxesCombined,
    ShoppingBagIcon,
    Container,
    CircleDollarSign,
} from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Separator } from "@/Components/ui/separator";
import StockBarChart from "@/Components/Charts/StockBarChart";
import OrderTrendPieChart from "@/Components/Charts/OrderTrendPieChart";
import SalesAreaChart from "@/Components/Charts/SalesAreaChart";
import StatCard from "@/Components/Dashboard/StatCard";
import ErrorBoundary from "@/Components/Dashboard/ErrorBoundary";
import { CHART_COLORS, FORMATTERS } from "@/constants/dashboard";

export default function Dashboard() {
    const {
        totalSold,
        totalSales,
        overAllCost,
        selectedYear,
        availableYears,
        salesByMonth,
        productNumberOfOrders,
        productStocks,
    } = usePage().props;
    const [year, setYear] = useState(selectedYear);

    // Memoized data processing
    const processedData = useMemo(() => {
        const { totalProductStock, ...productStock } = productStocks;
        const productStockArray = productStock.productsStock;

        const highestMonthlySales = Math.max(
            ...salesByMonth.map((sale) => sale.total_sales)
        );
        const roundMax = Math.ceil(highestMonthlySales / 1000) * 1000;

        const productNumberOfOrdersWithColor = productNumberOfOrders.map(
            (entry, index) => ({
                ...entry,
                fill: CHART_COLORS[index % CHART_COLORS.length],
            })
        );

        const totalSoldValue = totalSold?.[0]?.total_sold || 0;

        return {
            productStockArray,
            totalProductStock,
            roundMax,
            productNumberOfOrdersWithColor,
            totalSoldValue,
        };
    }, [productStocks, salesByMonth, productNumberOfOrders, totalSold]);

    const handleYearChange = useCallback((value) => {
        setYear(value);
        router.get(
            route("dashboard.index"),
            { year: value },
            { preserveState: true }
        );
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col w-full gap-4 overflow-hidden">
                <div className="flex">
                    <SidebarTrigger />
                    <p className="text-xl font-bold">Dashboard</p>
                </div>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2">
                    <StatCard
                        title="Total Products Order"
                        value={processedData.totalSoldValue}
                        icon={ShoppingBagIcon}
                    />
                    <StatCard
                        title="Available Stocks"
                        value={processedData.totalProductStock}
                        icon={Container}
                    />
                    <StatCard
                        title="Total Sales"
                        value={totalSales}
                        icon={ChartNoAxesCombined}
                        formatter={FORMATTERS.currency}
                    />
                    <StatCard
                        title="Overall Cost of Production"
                        value={overAllCost}
                        icon={CircleDollarSign}
                        formatter={FORMATTERS.currency}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2  gap-2">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <span>Products Stocks</span>
                        </CardHeader>
                        <CardContent>
                            <ErrorBoundary>
                                <StockBarChart
                                    data={processedData.productStockArray}
                                />
                            </ErrorBoundary>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <span>Products Order Trend</span>
                        </CardHeader>
                        <CardContent>
                            <ErrorBoundary>
                                <OrderTrendPieChart
                                    data={
                                        processedData.productNumberOfOrdersWithColor
                                    }
                                />
                            </ErrorBoundary>
                        </CardContent>
                        <CardFooter>
                            <div className="leading-none text-muted-foreground">
                                Showing total products that is ordered
                            </div>
                        </CardFooter>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader>
                            <span>Monthly Sales Overview</span>

                            <Select
                                value={String(year)}
                                onValueChange={handleYearChange}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableYears.map((y) => (
                                        <SelectItem key={y} value={String(y)}>
                                            {y}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardHeader>
                        <CardContent>
                            <ErrorBoundary>
                                <SalesAreaChart
                                    data={salesByMonth}
                                    roundMax={processedData.roundMax}
                                />
                            </ErrorBoundary>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>;
