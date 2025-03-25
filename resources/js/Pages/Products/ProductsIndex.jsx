import MainLayout from '@/Layouts/MainLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Head, usePage } from '@inertiajs/react';
import { createContext } from 'react';

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
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "actions",
        header: "Actions",      
        cell: ({ row, productId }) => {
            productId = row.original.id;

            return(
                <div className='flex gap-2'>
                    <DeleteButtonContext.Provider value={{id: productId, deleteRoute: 'products.destroy', dataLabel: 'product'}}>
                        <DeleteButton/>
                    </DeleteButtonContext.Provider>
                    
                    <UpdateButtonContext.Provider value={{id: productId, updateRoute: 'products.edit'}}>
                        <UpdateButton/>
                    </UpdateButtonContext.Provider>
                </div>
            );
        }

    }
]

export default function ProductsIndex() {
    const { products, search } = usePage().props;

    return (       
        <>
            <div className='mt-4'>
                <p className="text-xl font-bold mb-4">Products</p>
                <div>
                    <Head title='Products'/>

                    <div className='flex justify-between mb-2 gap-2'>
                        <SearchFormContext.Provider value={{search, indexRoute: 'products.index', placeholder: "Search Products..."}}>
                            <SearchForm/>
                        </SearchFormContext.Provider>
                        
                        <CreateButtonContext.Provider value={{createRoute: 'products.create'}}>
                            <CreateButton/>
                        </CreateButtonContext.Provider>

                    </div>
                    
                    <DataTable columns={productCol} data={products?.data || []}/>
                </div>

                <div className='flex justify-end gap-4 mt-4'>

                    <NavigationButtonContext.Provider value={{prevPageUrl: products.prev_page_url, nextPageUrl: products.next_page_url, currentPage: products.current_page, lastPage: products.last_page}}>
                        <NavigationButton/>
                    </NavigationButtonContext.Provider>
                    
                </div>
            </div>  
        </>
    );
}

ProductsIndex.layout = (page) => <MainLayout>{page}</MainLayout>
