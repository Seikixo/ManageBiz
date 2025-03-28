import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { DataTable } from '@/Components/DataTable';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import SearchFormContext from "@/hooks/Contexts/SearchFormContext";
import SearchForm from "@/Components/SearchForm";
import NavigationButtonContext from "@/hooks/Contexts/NavigationButtonContext";
import NavigationButton from "@/Components/NavigationButton";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/Components/ui/button";
import DeleteButtonContext from "@/hooks/Contexts/DeleteButtonContext";
import DeleteButton from "@/Components/DeleteButton";

export default function OrdersIndex() {
    const { orders, search } = usePage().props;
    const [selectedOrder, setSelectedOrder] = useState(null);
    const statusColors = {
        Pending: "bg-yellow-100 text-yellow-800",
        Processing: "bg-blue-100 text-blue-800",
        Delivered: "bg-green-100 text-green-800",
    };

    const orderCol = [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "customer",
            header: "Customer",
            cell: ({ row }) => row.original.customer?.name || "No Customer",
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
            cell: ({ row }) => {
                const orderStatus = row.original.status;

                return(
                    <span className={`px-2 py-1 rounded text-sm font-medium ${statusColors[orderStatus] || "bg-gray-100 text-gray-800"}`}>
                        {orderStatus}
                    </span>
                )
            }
        },
        {
            accessorKey: "actions",
            header: "Actions",      
            cell: ({ row }) => {
                const order = row.original;
                const orderId = row.original.id;
                return (
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            className="bg-blue-400 text-white px-4 rounded-md"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <Eye />
                        </Button>
                        <DeleteButtonContext.Provider value={{id: orderId, deleteRoute: 'orders.destroy', dataLabel: 'Order'}}>
                            <DeleteButton/>
                        </DeleteButtonContext.Provider>
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <Head title='Orders'/>
            <div className="flex flex-col w-full mt-4">
                <p className="text-xl font-bold mb-4">Orders</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center w-full h-full gap-4">
                    
                    <div className="flex flex-col flex-grow w-full h-full lg:col-span-2">
                        <Card className="p-2 h-full">
                            <div className="flex mb-2">
                                <SearchFormContext.Provider value={{search, indexRoute: 'orders.index', placeholder: "Search Customer..."}}>
                                    <SearchForm />
                                </SearchFormContext.Provider>
                            </div>
                            <div>
                                <DataTable columns={orderCol} data={orders?.data || []} />
                            </div>
                            <div className='flex justify-end gap-4 mt-4'>
                                <NavigationButtonContext.Provider value={{prevPageUrl: orders.prev_page_url, nextPageUrl: orders.next_page_url, currentPage: orders.current_page, lastPage: orders.last_page}}>
                                    <NavigationButton />
                                </NavigationButtonContext.Provider>
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-col flex-grow w-full h-full">
                        <Card className="p-2 h-full">
                            <CardHeader>
                                <CardTitle className="text-blue-400 text-xl">
                                    Order Product Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="max-h-[600px] overflow-y-auto">
                                {selectedOrder ? (
                                    <div>
                                        <h5 className="mt-2 text-lg font-bold">Order</h5>
                                        <div className="mb-8">
                                            <p>Order ID: {selectedOrder.id}</p>
                                            <p>Customer: {selectedOrder.customer?.name || "No Customer"}</p>
                                            <p>Order Date: {selectedOrder.order_date}</p>
                                            <p>Total Price: {selectedOrder.total_price ? `${Number(selectedOrder.total_price).toFixed(2)}` : 'N/A'}</p>
                                            <p>Status: <span className={`px-2 py-1 rounded text-sm font-medium ${statusColors[selectedOrder.status] || "bg-gray-100 text-gray-800"}`}>{selectedOrder.status}</span></p>
                                        </div>
                                        <div>
                                            <h5 className="mt-2 text-lg font-bold">Products</h5>
                                            <ul>
                                                {selectedOrder.products?.map((product) => (
                                                    <li key={product.id} className="border-b py-2">
                                                        <p>Product Name: {product.name}</p>
                                                        <p>Quantity: {product.pivot.quantity}</p>
                                                        <p>Price at Order: ${Number(product.pivot.price_at_order || 0).toFixed(2)}</p>
                                                    </li>
                                                )) || <p>No Products Available</p>}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Select an order to view product orders.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

OrdersIndex.layout = (page) => <MainLayout>{page}</MainLayout>;
