import CreateButton from '@/Components/CreateButton';
import { DataTable } from '@/Components/DataTable';
import NavigationButton from '@/Components/NavigationButton';
import SearchForm from '@/Components/SearchForm';
import CreateButtonContext from '@/hooks/Contexts/CreateButtonContext';
import NavigationButtonContext from '@/hooks/Contexts/NavigationButtonContext';
import SearchFormContext from '@/hooks/Contexts/SearchFormContext';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';


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

            return(
                <div className='flex gap-2'>

                </div>
            );
        }

    }
]

export default function CustomersIndex () {
    const { customers, search } = usePage().props;

    return (
        <>
            <div className='mt-4'>
                <p className="text-xl font-bold mb-4">Customers</p>
                <div>
                    <Head title='Customers' />
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
            </div>
        </>
    );
}

CustomersIndex.layout = (page) => <MainLayout>{page}</MainLayout>