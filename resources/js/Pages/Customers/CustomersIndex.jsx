import CreateButton from '@/Components/CreateButton';
import { DataTable } from '@/Components/DataTable';
import DeleteButton from '@/Components/DeleteButton';
import NavigationButton from '@/Components/NavigationButton';
import SearchForm from '@/Components/SearchForm';
import { Card } from '@/Components/ui/card';
import { Separator } from '@/Components/ui/separator';
import { SidebarTrigger } from '@/Components/ui/sidebar';
import UpdateButton from '@/Components/UpdateButton';
import CreateButtonContext from '@/hooks/Contexts/CreateButtonContext';
import DeleteButtonContext from '@/hooks/Contexts/DeleteButtonContext';
import NavigationButtonContext from '@/hooks/Contexts/NavigationButtonContext';
import SearchFormContext from '@/hooks/Contexts/SearchFormContext';
import UpdateButtonContext from '@/hooks/Contexts/UpdateButtonContext';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';


const customerCol = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "contact_number",
        header: "Contact Number",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "actions",
        header: "Actions",      
        cell: ({ row, customerId }) => {
            customerId = row.original.id;
            const deleteContenxtValue = useMemo(() => ({
                id: customerId, 
                deleteRoute: 'customers.destroy', 
                dataLabel: 'Customer'
            }), [customerId]);

            const updateContextValue = useMemo(() => ({
                id: customerId,
                updateRoute: 'customers.edit'
            }), [customerId]);
            return(
                <div className='flex gap-2'>
                    <DeleteButtonContext.Provider value={deleteContenxtValue}>
                        <DeleteButton/>
                    </DeleteButtonContext.Provider>

                    <UpdateButtonContext.Provider value={updateContextValue}>
                        <UpdateButton/>
                    </UpdateButtonContext.Provider>
                </div>
            );
        }

    }
]

export default function CustomersIndex () {
    const { customers, search } = usePage().props;

    return (
        <>
            <Head title='Customers' />
            <div className='flex flex-col w-full gap-4'>
                <div className="flex">
                    <SidebarTrigger/>
                    <p className="text-xl font-bold">Customers</p>
                </div>
                <Separator/>
                <Card className='p-2'>    
                    <div>
                        <div className='flex justify-between mb-2 gap-2'>
                            <SearchFormContext.Provider value={{search, indexRoute: 'customers.index', placeholder: "Search Customers..."}}>
                                <SearchForm/>
                            </SearchFormContext.Provider>

                            <CreateButtonContext.Provider value={{createRoute: 'customers.create'}}>
                                <CreateButton/>
                            </CreateButtonContext.Provider>
                        </div>

                        <DataTable columns={customerCol} data={customers?.data || []}/>
                    </div>
                    
                    <div className='flex justify-end gap-4 mt-4'>
                        <NavigationButtonContext.Provider value={{prevPageUrl: customers.prev_page_url, nextPageUrl: customers.next_page_url, currentPage: customers.current_page, lastPage: customers.last_page}}>
                            <NavigationButton/>
                        </NavigationButtonContext.Provider>
                    </div>
                </Card>
            </div>
            
        </>
    );
}

CustomersIndex.layout = (page) => <MainLayout>{page}</MainLayout>