import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import InputError from '@/Components/InputError';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function CustomerEdit () {
    const { customer } = usePage().props;

    const { data, put, processing, errors, reset, setData } = useForm({
        name: customer?.name || '',
        address: customer?.address || '',
        contact_number: customer?.contact_number || '',
        email: customer?.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('customers.update', customer.id), { data });
    } 

    return(
        <>
            <Head title="Create Customers"/>
            <div>
                <div>
                    <p className="text-xl font-bold mb-4">Update Customers</p>
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
                            <Label className='text-gray-600'>This will be the customer name</Label>
                            <InputError message={errors.name} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="address">Address</Label>

                            <Input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            <Label className='text-gray-600'>You can add description of the customer</Label>
                            <InputError message={errors.address} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="contact_number">Contact Number</Label>
                            <Input 
                                id="contact_number"
                                type="text"
                                name="contact_number"
                                value={data.contact_number}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) => setData('contact_number', e.target.value)}
                            />
                            <Label className='text-gray-600'>This will be the customer contact number</Label>
                            <InputError message={errors.contact_number} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="email">Email</Label>

                            <Input 
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <Label className='text-gray-600'>This will be the email of the customer</Label>
                            <InputError message={errors.email} className='mt-2' />
                        </div>

                        <Button className='mt-6' type='submit' disabled={processing}>
                            Update
                        </Button>

                        <Link href={route('customers.index')}>
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

CustomerEdit.layout = (page) => <MainLayout>{page}</MainLayout>