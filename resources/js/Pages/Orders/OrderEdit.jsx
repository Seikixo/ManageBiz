import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import InputError from '@/Components/InputError';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";

export default function OrderEdit() {
    const { order, products, customers } = usePage().props;

    const { data, put, processing, errors, setData } = useForm({
        customer_id: order?.customer_id || '',
        order_date: order?.order_date ? new Date(order.order_date) : '',
        status: order?.status || '',
        products: order?.products?.map(p => ({
            product_id: p.id, 
            quantity: p.pivot.quantity
       })) || [],
    });

    const submit = (e) => {
        e.preventDefault();
    
        const orderDate = data.order_date 
            ? new Date(data.order_date) 
            : null;
    
        put(route("orders.update", order.id), {
            ...data,
            order_date: orderDate instanceof Date && !isNaN(orderDate)
                ? format(orderDate, "yyyy-MM-dd")
                : "",
            products: data.products.map(p => ({
                product_id: p.product_id,
                quantity: Number(p.quantity),
            })),
        });
    };
    
    

    return (
        <>
            <Head title="Create Order" />
            <div>
                <p className="text-xl font-bold mb-4">Update Order</p>

                <div className='w-1/2'>
                    <form onSubmit={submit}>

                        <div className='mt-4'>
                            <Label>Customer</Label>
                            <Select
                                onValueChange={(value) => setData('customer_id', value)}
                                value={data.customer_id?.toString()}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers?.map(customer => (
                                        <SelectItem key={customer.id} value={customer.id.toString()}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.customer_id} className="mt-2"/>
                        </div>

                        <div className='mt-4'>
                            <Label>Order Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.order_date ? format(data.order_date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={data.order_date ? new Date(data.order_date) : null}
                                    onSelect={(date) => { 
                                        if (date) {
                                            setData("order_date", format(date, "yyyy-MM-dd"))
                                        }
                                    }}                               
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.order_date} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label>Status</Label>
                            <Select 
                                onValueChange={(value) => setData('status', value)} 
                                value={data.status}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select order status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} className='mt-2' />
                        </div>
                        
                        <div className='mt-4'>
                            <Label className="mr-2">Products</Label>
                            {data.products.map((product, index) => (
                                <div key={index} className="flex gap-2 items-center mt-2">
                                    <Select 
                                        onValueChange={(value) => {
                                            const updatedProducts = [...data.products];
                                            updatedProducts[index].product_id = parseInt(value, 10);
                                            setData('products', updatedProducts);
                                        }} 
                                        value={product.product_id?.toString()}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products?.map(prod => (
                                                <SelectItem key={prod.id} value={prod.id.toString()}>
                                                    {prod.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input 
                                        type="number"
                                        name="quantity"
                                        value={product.quantity.toString()}
                                        className="w-20 bg-white"
                                        placeholder="Qty"
                                        onChange={(e) => {
                                            const updatedProducts = [...data.products];
                                            updatedProducts[index].quantity = e.target.value;
                                            setData('products', updatedProducts);
                                        }}
                                        min="1"
                                    />
                                    <Button variant="destructive" type="button" size="sm" onClick={() => {
                                        const updatedProducts = [...data.products];
                                        updatedProducts.splice(index, 1);
                                        setData('products', updatedProducts);
                                    }}>
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            <Button type="button" variant="outline" className="mt-2" onClick={() => {
                                setData('products', [...data.products, { product_id: '', quantity: 1 }]);
                            }}>
                                + Add Product
                            </Button>
                            <InputError message={errors.products} className='mt-2' />
                        </div>

                        <div className="mt-6 flex gap-4">
                            <Button type='submit' disabled={processing}>
                                Submit
                            </Button>
                            <Link href={route('orders.index')}>
                                <Button variant='outline' type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

OrderEdit.layout = (page) => <MainLayout>{page}</MainLayout>;
