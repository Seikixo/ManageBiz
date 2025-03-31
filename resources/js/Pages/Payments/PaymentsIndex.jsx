import MainLayout from '@/Layouts/MainLayout';
import { DataTable } from '@/Components/DataTable';
import { Head, usePage } from '@inertiajs/react';

import SearchFormContext from '@/hooks/Contexts/SearchFormContext';
import CreateButtonContext from '@/hooks/Contexts/CreateButtonContext';
import NavigationButtonContext from '@/hooks/Contexts/NavigationButtonContext';
import DeleteButtonContext from '@/hooks/Contexts/DeleteButtonContext';
import UpdateButtonContext from '@/hooks/Contexts/UpdateButtonContext';

import CreateButton from '@/Components/CreateButton';
import SearchForm from '@/Components/SearchForm';
import UpdateButton from '@/Components/UpdateButton';
import DeleteButton from '@/Components/DeleteButton';
import NavigationButton from '@/Components/NavigationButton';
import { Card } from '@/Components/ui/card';

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Refund: "bg-blue-100 text-blue-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800"
};

const paymentCol = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
    },
    {
        accessorKey: "payment_date",
        header: "Payment Date",
    },
    {
        accessorKey: "payment_amount",
        header: "Payment Amount",
    },
    {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: ({ row }) => {
            const paymentStatus = row.original.payment_status;

            return(
                <span className={`px-2 py-1 rounded text-sm font-medium ${statusColors[paymentStatus] || "bg-gray-100 text-gray-800"}`}>
                    {paymentStatus}
                </span>
            );
        }
    },
    {
        accessorKey: "payment_type",
        header: "Payment Type",
    },
    {
        accessorKey: "actions",
        header: "Actions",      
        cell: ({ row, paymentId }) => {
            paymentId = row.original.id;

            return(
                <div className='flex gap-2'>
                    <DeleteButtonContext.Provider value={{id: paymentId, deleteRoute: 'payments.destroy', dataLabel: 'Payment'}}>
                        <DeleteButton/>
                    </DeleteButtonContext.Provider>
                    
                    <UpdateButtonContext.Provider value={{id: paymentId, updateRoute: 'payments.edit'}}>
                        <UpdateButton/>
                    </UpdateButtonContext.Provider>
                </div>
            );
        }

    }
]

export default function PaymentsIndex() {
    const { payments, search } = usePage().props;

    return (       
        <>
            <Head title='payments'/>
            <p className="text-xl font-bold mb-4">Payments</p>
            <Card className='mt-4 p-2'>
                <div>
                    <div className='flex justify-between mb-2 gap-2'>
                        <SearchFormContext.Provider value={{search, indexRoute: 'payments.index', placeholder: "Search Customer..."}}>
                            <SearchForm/>
                        </SearchFormContext.Provider>
                        
                        <CreateButtonContext.Provider value={{createRoute: 'payments.create'}}>
                            <CreateButton/>
                        </CreateButtonContext.Provider>

                    </div>
                    
                    <DataTable columns={paymentCol} data={payments?.data || []}/>
                </div>

                <div className='flex justify-end gap-4 mt-4'>

                    <NavigationButtonContext.Provider value={{prevPageUrl: payments.prev_page_url, nextPageUrl: payments.next_page_url, currentPage: payments.current_page, lastPage: payments.last_page}}>
                        <NavigationButton/>
                    </NavigationButtonContext.Provider>
                    
                </div>
            </Card>  
        </>
    );
}

PaymentsIndex.layout = (page) => <MainLayout>{page}</MainLayout>
