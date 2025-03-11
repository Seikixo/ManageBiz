import { DataTable } from '@/Components/DataTable';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';

const productCol = [
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
]

export default function ProductsIndex() {
    const { products } = usePage().props;
    return (
        <MainLayout>
            <div className='p-4'>
                <Head title='Products'/>
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <DataTable columns={productCol} data={products}/>
            </div>
        </MainLayout>
    );
}
