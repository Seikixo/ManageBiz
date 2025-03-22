import MainLayout from '@/Layouts/MainLayout';
import { DataTable } from '@/Components/DataTable';
import { Head, usePage } from '@inertiajs/react';

import SearchFormContext from '@/hooks/Contexts/SearchFormContext';
import CreateButtonContext from '@/hooks/Contexts/CreateButtonContext';
import DeleteButtonContext from '@/hooks/Contexts/DeleteButtonContext';
import NavigationButtonContext from '@/hooks/Contexts/NavigationButtonContext';
import UpdateButtonContext from '@/hooks/Contexts/UpdateButtonContext';

import SearchForm from '@/Components/SearchForm';
import CreateButton from '@/Components/CreateButton';
import DeleteButton from '@/Components/DeleteButton';
import NavigationButton from '@/Components/NavigationButton';
import UpdateButton from '@/Components/UpdateButton';

const productionCol = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "product.name", 
        header: "Product Name",
    },
    {
        accessorKey: "quantity_produced",
        header: "Quantity Produced",
    },
    {
        accessorKey: "production_date",
        header: "Production Date",
    },
    {
        accessorKey: "material_cost",
        header: "Material Cost",
    },
    {
        accessorKey: "production_cost",
        header: "Production Cost",
    },
    {
        accessorKey: "overall_cost",
        header: "Overall Cost",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row, productionId }) => {
            productionId = row.original.id;

            return(
                <div className='flex gap-2'>
                    <DeleteButtonContext.Provider value={{id: productionId, deleteRoute: 'productions.destroy', dataLabel: 'production'}}>
                        <DeleteButton/>
                    </DeleteButtonContext.Provider >

                    <UpdateButtonContext.Provider value={{id: productionId, updateRoute: 'productions.edit'}}>
                        <UpdateButton/>
                    </UpdateButtonContext.Provider>
                </div>
            );
        }
    },
];

export default function ProductionsIndex() {
    const { productions } = usePage().props;
    const { search } = usePage().props;

    return (
        <>
            <div className='mt-4'>
                <p className="text-xl font-bold mb-4">Productions</p>
                <div>
                    <Head title='Productions'/>

                    <div className='flex justify-between mb-2 gap-2'>
                        <SearchFormContext.Provider value={{search, indexRoute: 'productions.index', placeholder: "Search Products..."}}>
                            <SearchForm/>
                        </SearchFormContext.Provider>

                        <CreateButtonContext.Provider value={{createRoute: 'productions.create'}}>
                            <CreateButton/>
                        </CreateButtonContext.Provider>

                    </div>
                    
                    <DataTable columns={productionCol} data={productions?.data || []}/>
                </div>

                <div className='flex justify-end gap-4 mt-4'>

                    <NavigationButtonContext.Provider value={{prevPageUrl: productions.prev_page_url, nextPageUrl: productions.next_page_url, currentPage: productions.current_page, lastPage: productions.last_page}}>
                        <NavigationButton/>
                    </NavigationButtonContext.Provider>

                </div>

                
            </div>  
        </>
    );
}

ProductionsIndex.layout = (page) => <MainLayout>{page}</MainLayout>
