import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage, router } from '@inertiajs/react';

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

const gotoPage = (url) => {
    if(url) {
        router.get(url);
    }
};

export default function ProductsIndex() {
    const { products } = usePage().props;
    return (
        <MainLayout>
            <div className='w-full'>
                <div>
                    <Head title='Products'/>
                    <h1 className="text-2xl font-bold mb-4">Products</h1>
                    <DataTable columns={productCol} data={products.data}/>
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
            
        </MainLayout>
    );
}
