import MainLayout from '@/Layouts/MainLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Head, usePage, router } from '@inertiajs/react';
import { createContext } from 'react';

import CreateButton from '@/Components/CreateButton';
import SearchForm from '@/Components/SearchForm';
import UpdateButton from '@/Components/UpdateButton';
import DeleteButton from '@/Components/DeleteButton';

export const SearchFormContext = createContext();
export const CreateButtonContext = createContext();
export const UpdateButtonContext = createContext();
export const DeleteButtonContext = createContext();


const productCol = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "total_cost",
        header: "Total Cost",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "actions",
        header: "Actions",      
        cell: ({ row }) => (
        <div className='flex gap-2'>
            
            <DeleteButtonContext.Provider value={{id: row.original.id, deleteRoute: 'products.destroy'}}>
                <DeleteButton/>
            </DeleteButtonContext.Provider>
            
            <UpdateButtonContext.Provider value={{id: row.original.id, updateRoute: 'products.edit'}}>
                <UpdateButton/>
            </UpdateButtonContext.Provider>
        </div>
        )
    }
]

const gotoPage = (url) => {
    if(url) {
        router.get(url);
    }
};

export default function ProductsIndex() {
    const { products } = usePage().props;
    const { search } = usePage().props;

    return (       
        <div className='mt-4'>
            <p className="text-xl font-bold mb-4">Products</p>
            <div>
                <Head title='Products'/>

                <div className='flex justify-between mb-2 gap-2'>
                    <SearchFormContext.Provider value={{search, indexRoute: 'products.index'}}>
                        <SearchForm/>
                    </SearchFormContext.Provider>
                    
                    <CreateButtonContext.Provider value={{createRoute: 'products.create'}}>
                        <CreateButton/>
                    </CreateButtonContext.Provider>

                </div>
                
                <DataTable columns={productCol} data={products?.data || []}/>
            </div>

            <div className='flex justify-end gap-4 mt-4'>
                <Button 
                    variant="outline"
                    size="sm"
                    disable={!products.prev_page_url}
                    onClick={() => gotoPage(products.prev_page_url)}
                >
                    Previous
                </Button>
                <span>Page {products.current_page} of {products.last_page}</span>
                <Button 
                    variant="outline"
                    size="sm"
                    disable={!products.next_page_url}
                    onClick={() => gotoPage(products.next_page_url)}
                >
                    Next
                </Button>
            </div>
        </div>  
    );
}

ProductsIndex.layout = (page) => <MainLayout>{page}</MainLayout>
