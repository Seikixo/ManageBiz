import MainLayout from '@/Layouts/MainLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { toast } from 'sonner';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Trash2, Pencil, Search} from "lucide-react";
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"


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
            <DeleteProductButton id={ row.original.id }/>
            <UpdateProductButton id={ row.original.id }/>
        </div>
        )
    }
]

const DeleteProductButton = ({ id }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {

        router.delete(route('products.destroy', id), {
            onSuccess: () => toast.success("Product deleted successfully"),
            onError: () => toast.error("Failed to delete product")
        });
        setOpen(false);
    };

    return(
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            
            <Button variant="destructive" className="flex gap-2 justify-center">
                <Trash2/>
                Delete
            </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the product.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

    </AlertDialog>
    );
}

const UpdateProductButton = ({ id }) => {
    return(
        
            <Link
            href={route('products.edit', id)}
            >
                <Button className="flex gap-2 justify-center">
                    <Pencil/>
                    Edit
                </Button>
            </Link>
        
    );
}

const SearchProductButton = ({ search }) => {
    const [searchQuery, setSearchQuery] = useState(search || '');

    const submit = (e) => {
        e.preventDefault();

        router.get(route('products.index'),
            { search: searchQuery },
            { preserveState: true, replace: true}
        );
    }

    return(
        <form onSubmit={submit}>
            <div className='flex gap-2'>
                <Input 
                    id='search'
                    name='search'
                    placeholder="Search Product..." 
                    className="bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit">
                    <Search/>
                </Button>
            </div>

        </form>
    );
}

const gotoPage = (url) => {
    if(url) {
        router.get(url);
    }
};

export default function ProductsIndex() {
    const { products } = usePage().props;
    const { search } = usePage().props;

    return (
        <MainLayout>
            <div className='mt-4'>
                <p className="text-xl font-bold mb-4">Products</p>
                <div>
                    <Head title='Products'/>

                    <div className='flex justify-between mb-2 gap-2'>
                        <SearchProductButton search={search}/>
                        
                        <Link 
                        href={route('products.create')}
                        >
                            <Button className="flex gap-2 justify-center" variant='outline'>
                                <Plus/>
                                Create
                            </Button>
                        </Link>

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
            
        </MainLayout>
    );
}
