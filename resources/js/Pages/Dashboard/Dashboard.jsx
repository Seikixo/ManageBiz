import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { ChartNoAxesCombined, ShoppingBagIcon, Container, CircleDollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

export default function Dashboard() {
    const { totalStocks, totalSold, totalSales, overAllCost, selectedYear, availableYears, salesByMonth } = usePage().props;
    const [year, setYear] = useState(selectedYear);
    

    const handleYearChange = (value) => {
        setYear(value);
        router.get(route('dashboard.index'), { year: value }, { preserveState: true });
    };

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

                <div>
                    <Card>
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
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesByMonth}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total_sales" fill="#4F46E5" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>
