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
import { Card } from '@/Components/ui/card';
import { SidebarTrigger } from '@/Components/ui/sidebar';
import { Separator } from '@/Components/ui/separator';

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
        cell: ({ row }) => {
            const materialCost = row.original.material_cost;

            return(
                <>
                    <span>
                        ₱{Number(materialCost).toLocaleString()}
                    </span>
                </>
            )
        }
    },
    {
        accessorKey: "production_cost",
        header: "Production Cost",
        cell: ({ row }) => {
            const productionCost = row.original.production_cost;

            return(
                <>
                    <span>
                        ₱{Number(productionCost).toLocaleString()}
                    </span>
                </>
            )
        }
    },
    {
        accessorKey: "overall_cost",
        header: "Overall Cost",
        cell: ({ row }) => {
            const overallCost = row.original.overall_cost;

            return(
                <>
                    <span>
                        ₱{Number(overallCost).toLocaleString()}
                    </span>
                </>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row, productionId }) => {
            productionId = row.original.id;

            return(
                <div className='flex gap-2'>
                    <DeleteButtonContext.Provider value={{id: productionId, deleteRoute: 'productions.destroy', dataLabel: 'Production'}}>
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
    const { productions, search } = usePage().props;

    return (
        <>
            <Head title='Productions'/>   
            <div className='flex flex-col w-full mt-2 gap-4'>
                <div className="flex">
                    <SidebarTrigger/>
                    <p className="text-xl font-bold">Productions</p>
                </div>
                <Separator/>
                <Card className='p-2'>
                <div>
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

                
                </Card>
            </div>
              
        </>
    );
}

ProductionsIndex.layout = (page) => <MainLayout>{page}</MainLayout>
