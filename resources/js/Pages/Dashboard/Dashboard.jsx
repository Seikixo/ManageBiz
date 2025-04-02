import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { ChartNoAxesCombined, ShoppingBagIcon, Container, CircleDollarSign } from 'lucide-react';

export default function Dashboard() {
    const { totalStocks, totalSold, totalSales, overAllCost } = usePage().props;


    return (
        <>
            <Head title='Dashboard' />
            <div className="flex flex-col w-full mt-4">
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
                            {totalSales}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-2">
                            Overall Cost of Production
                            <CircleDollarSign/>
                        </CardHeader>
                        <CardContent className="text-4xl">
                            {overAllCost}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>
