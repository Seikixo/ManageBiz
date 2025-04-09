import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { ChartNoAxesCombined, ShoppingBagIcon, Container, CircleDollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, AreaChart, Area, LabelList } from 'recharts';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { SidebarTrigger } from '@/Components/ui/sidebar';
import { Separator } from '@/Components/ui/separator';

export default function Dashboard() {
    const { totalSold, totalSales, overAllCost, selectedYear, availableYears, salesByMonth, productNumberOfOrders, productStocks } = usePage().props;
    const [year, setYear] = useState(selectedYear);

    const {totalProductStock, ...productStock} = productStocks;
    const productStockArray = productStock.productsStock;


    const highestMonthlySales = Math.max(...salesByMonth.map(sale => sale.total_sales));
    const roundMax = Math.ceil(highestMonthlySales / 1000) * 1000;

    const handleYearChange = (value) => {
        setYear(value);
        router.get(route('dashboard.index'), { year: value }, { preserveState: true });
    };

    const tailwindColors = [
        "#f87171",
        "#34d399", 
        "#2dd4bf", 
        "#22d3ee", 
        "#38bdf8", 
        "#60a5fa", 
        "#818cf8", 
        "#a78bfa",
        "#c084fc",
        "#e879f9",
        "#f472b6",
        "#fb7185",
    ]
      
    const productNumberOfOrdersWithColor = productNumberOfOrders.map((entry, index) => ({
        ...entry,
        fill: tailwindColors[index % tailwindColors.length],
    }))

    return (
        <>
            <Head title='Dashboard' />
            <div className="flex flex-col w-full gap-4 overflow-hidden">
                <div className="flex">
                    <SidebarTrigger/>
                    <p className="text-xl font-bold">Dashboard</p>
                </div>
                <Separator/>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2">
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Total Products Order
                            <ShoppingBagIcon/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            {totalSold.map(t => t.total_sold)}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Available Stocks
                            <Container/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            {totalProductStock}
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

                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2  gap-2">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <span>Products Stocks</span>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={productStockArray}
                                    layout="vertical"
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
                                    <XAxis 
                                        type="number" 
                                        tick={{ fontSize: 14 }}
                                    />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        hide
                                    />
                                    <Tooltip 
                                        contentStyle={{borderRadius: '4px'}}
                                        formatter={(value) => `${value} items`}
                                    />
                                    <Bar 
                                        dataKey="product_stocks" 
                                        fill="#818cf8" 
                                        radius={4} 
                                        barSize={60} 
                                    >
                                        <LabelList
                                            dataKey="name"
                                            position="insideLeft"
                                            fontSize={12}
                                            stroke="none"
                                            className="fill-black"
                                        />
                                    </Bar>

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
                                        <LabelList
                                            dataKey="name"
                                            position="inside"
                                            fontSize={12}
                                            stroke="none"
                                            className="fill-black"
                                        />
                                    </Pie>
                                    <Tooltip 
                                    contentStyle={{
                                        borderRadius: '4px',
                                    }}
                                    formatter={(value) => `${value} orders`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
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
                            <AreaChart data={salesByMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="month" 
                                    tick={{ fontSize: 14 }}
                                />
                                <YAxis 
                                    domain={[0, roundMax]}
                                    tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
                                    tick={{ fontSize: 14 }}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '4px' }}
                                    formatter={(value) => `₱${Number(value).toLocaleString()}`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total_sales"
                                    stroke="#818cf8"
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>
