import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { DataTable } from '@/Components/DataTable';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import SearchFormContext from "@/hooks/Contexts/SearchFormContext";
import SearchForm from "@/Components/SearchForm";

const orderCol = [
    {
        accessorKey: "customer.name",
        header: "Customer",
    },
    {
        accessorKey: "order_date",
        header: "Order Date",
    },
    {
        accessorKey: "total_price",
        header: "Total Price",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "actions",
        header: "Actions",      
        cell: ({ row, productId }) => {
            productId = row.original.id;

            return(
                <div className='flex gap-2'>
                </div>
            );
        }

    }
]

export default function OrdersIndex() {
    const { orders, search } = usePage().props;

    return (
        <>
            <Head title='Orders'/>
            <div className="flex flex-col w-full mt-4">
                <p className="text-xl font-bold mb-4">Orders</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center w-full gap-4">
                    
                    <div className="flex flex-col flex-grow w-full lg:col-span-2">
                        <Card className="p-2">
                            <div className="flex mb-2">
                                <SearchFormContext.Provider value={{search, indexRoute: 'orders.index', placeholder: "Search Customer..."}}>
                                    <SearchForm/>
                                </SearchFormContext.Provider>
                            </div>

                            <DataTable columns={orderCol} data={orders?.data || []}/>
                        </Card>
                        
                    </div>

                    <div className="flex flex-col flex-grow w-full">
                    <Card>
                        <CardHeader>
                        <CardTitle>Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                        {/* Order Details Content */}
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>

        </>
    );
}

OrdersIndex.layout = (page) => <MainLayout>{page}</MainLayout>
