import MainLayout from '@/Layouts/MainLayout';
import { DataTable } from '@/Components/DataTable';
import { Head, usePage } from '@inertiajs/react';
import SearchForm from '@/Components/SearchForm';
import SearchFormContext from '@/hooks/Contexts/SearchFormContext';

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

                    </div>
                    
                    <DataTable columns={productionCol} data={productions?.data || []}/>
                </div>

                
            </div>  
        </>
    );
}

ProductionsIndex.layout = (page) => <MainLayout>{page}</MainLayout>
