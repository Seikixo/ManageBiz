import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import InputError from '@/Components/InputError';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

export default function ProductsCreate () {
    const { data, post, processing, errors, reset, setData } = useForm({
        name: '',
        description: '',
        category: '',
        price: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            data: {
                ...data,
                price:  Number(data.price),
            }
        });
    }

    return(
        <>
            <Head title="Create Products"/>
            <div>
                <div>
                    <p className="text-xl font-bold mb-4">Create Products</p>
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

                            <Textarea 
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
                            <Label>Category</Label>
                            <Select 
                                onValueChange={(value) => setData('category', value)} 
                                value={data.category}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bar">Bar</SelectItem>
                                    <SelectItem value="liquid">Liquid</SelectItem>
                                    <SelectItem value="powder">Powder</SelectItem>
                                </SelectContent>
                            </Select>
                            <Label className='text-gray-600'>Select the category of the product</Label>
                            <InputError message={errors.category} className='mt-2' />
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
                            Submit
                        </Button>

                        <Link href={route('products.index')}>
                                <Button className='mt-6 ms-4' variant='outline' type="button">
                                    Cancel
                                </Button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

ProductsCreate.layout = (page) => <MainLayout>{page}</MainLayout>