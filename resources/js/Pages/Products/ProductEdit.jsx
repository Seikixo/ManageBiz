import InputError from '@/Components/InputError';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function ProductEdit () {
    const { product } = usePage().props;

    const { data, put, processing, errors, reset, setData } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        total_cost: product?.total_cost || '',
        price: product?.price || '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('products.update', product.id), {
            data: {
                ...data,
                total_cost: Number(data.total_cost),
                price:  Number(data.price),
            }
        });
    }

    return(
        <MainLayout>
            <Head title="Update Product"/>
            <div>
                <div>
                    <p className="text-xl font-bold mb-4">Update Product</p>
                </div>

                <div className='w-1/2'>
                    <form onSubmit={submit}>
                        <div className='mt-4'>
                            <Label htmlFor="name">Name</Label>

                            <Input 
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <Label className='text-gray-600'>This will be the product name</Label>
                            <InputError message={errors.name} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="description">Description</Label>

                            <Input 
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full bg-white h-16"
                                isFocused={true}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <Label className='text-gray-600'>You can add description of the product</Label>
                            <InputError message={errors.description} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="total_cost">Total Cost</Label>

                            <Input 
                                id="total_cost"
                                type="number"
                                name="total_cost"
                                value={data.total_cost}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) => setData('total_cost', e.target.value)}
                            />
                            <Label className='text-gray-600'>This will be the total cost of the product</Label>
                            <InputError message={errors.total_cost} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="price">Price</Label>

                            <Input 
                                id="price"
                                type="number"
                                name="price"
                                value={data.price}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            <Label className='text-gray-600'>This will be the price of the product</Label>
                            <InputError message={errors.price} className='mt-2' />
                        </div>

                        <Button className='mt-6' type='submit' disabled={processing}>
                            Update
                        </Button>
                     
                        <Link href={route('products.index')}>                    
                            <Button className='mt-6 ms-4' variant='outline' type="button">
                                Cancel
                            </Button>
                        </Link>
                        
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}