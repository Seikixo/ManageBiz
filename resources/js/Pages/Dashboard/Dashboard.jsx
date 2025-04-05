import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { ChartNoAxesCombined, ShoppingBagIcon, Container, CircleDollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

export default function Dashboard() {
    const { totalStocks, totalSold, totalSales, overAllCost, selectedYear, availableYears, salesByMonth, productNumberOfOrders } = usePage().props;
    const [year, setYear] = useState(selectedYear);

    console.log('Orders:', productNumberOfOrders);

    const handleYearChange = (value) => {
        setYear(value);
        router.get(route('dashboard.index'), { year: value }, { preserveState: true });
    };

    const tailwindColors = [
        "#78716c", //stone-500
        "#64748b", //slate-500
        "#ef4444", // red-500
        "#3b82f6", // blue-500
        "#10b981", // green-500
        "#f59e0b", // yellow-500
        "#8b5cf6", // purple-500
        "#ec4899", // pink-500
        "#14b8a6", // teal-500
        "#f97316", // orange-500
        "#22d3ee", // cyan-400
        "#6366f1", // indigo-500
    ]
      
    const productNumberOfOrdersWithColor = productNumberOfOrders.map((entry, index) => ({
        ...entry,
        fill: tailwindColors[index % tailwindColors.length],
    }))

    return (
        <>
            <Head title='Dashboard' />
            <div className="flex flex-col w-full mt-4 gap-4">
                <p className="text-xl font-bold mb-4">Dashboard</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-1/2 md:h-1/3 lg:h-1/5 gap-2">
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Available Stock
                            <Container/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            {totalStocks}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Total Products Sold
                            <ShoppingBagIcon/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            {totalSold}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Total Sales
                            <ChartNoAxesCombined/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            ₱{Number(totalSales).toLocaleString()}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Overall Cost of Production
                            <CircleDollarSign/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            ₱{Number(overAllCost).toLocaleString()}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <span>Sales Overview</span>

                            <Select value={String(year)} onValueChange={handleYearChange}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableYears.map((y) => (
                                        <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardHeader>

                        <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={salesByMonth}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip contentStyle={{
                                    borderRadius: '4px', 
                                }}/>
                                <Bar dataKey="total_sales" fill="#4F46E5" radius={8} />
                            </BarChart>
                        </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <span>Products Order Trend</span>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={productNumberOfOrdersWithColor}
                                        dataKey="number_of_orders"
                                        nameKey="name"
                                    >
                                        {productNumberOfOrdersWithColor.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}

                                        <LabelList
                                            dataKey="name"
                                            position="inside"
                                            fontSize={12}
                                            stroke="none"
                                            className="fill-white"
                                        />
                                    </Pie>
                                    <Tooltip contentStyle={{
                                        borderRadius: '4px', // ← adjust this
                                    }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                        <CardFooter>
                            <div className="leading-none text-muted-foreground">
                                Showing total products that is ordered
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>
