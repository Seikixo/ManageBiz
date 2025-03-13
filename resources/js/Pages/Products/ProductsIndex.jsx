import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

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
            <div>
                <div>
                    <Head title='Products'/>

                    <div className='flex justify-between'>
                        <p className="text-xl font-bold mb-4">Products</p>
                        <Button>
                            <Link href={route('products.create')}>
                                Create Product
                            </Link>
                        </Button>
                    </div>
                    
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
