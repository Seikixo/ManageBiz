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

export default function PaymentEdit() {
    const { payment, orders } = usePage().props;

    const { data, put, processing, errors, setData } = useForm({
        order_id: payment?.order_id || '',
        customer_id: payment?.customer_id || '',
        payment_date: payment?.payment_date || '',
        payment_amount: payment?.payment_amount || '',
        payment_status: payment?.payment_status || '',
        payment_type: payment?.payment_type || '',
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        if (!data.payment_date) {
            setData("payment_date", ""); // Ensure it's empty instead of undefined
        }
    
        put(route("payments.update", payment.id), {
            data: {
                ...data,
                payment_date: data.payment_date ? format(new Date(data.payment_date), "yyyy-MM-dd") : "", // Ensure valid date
                payment_amount: Number(data.payment_amount),
            },
        });
    };
    
    

    return (
        <>
            <Head title="Edit Payment" />
            <div>
                <p className="text-xl font-bold mb-4">Edit Payment</p>

                <div className='w-1/2'>
                    <form onSubmit={submit}>
                        
                        <div className='mt-4'>
                            <Label>Order</Label>
                            <Select 
                                onValueChange={(value) => {
                                    const selectedOrder = orders.find(order => order.id.toString() === value);
                                    setData({
                                        ...data,
                                        order_id: value,
                                        customer_id: selectedOrder ? selectedOrder.customer.id.toString() : '',
                                    })} 
                                }
                                value={data.order_id?.toString()}
                            
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a Order" />
                                </SelectTrigger>
                                <SelectContent>
                                    {orders?.map(order => (
                                        <SelectItem key={order.id} value={order.id.toString()}>
                                            Order #{order.id} - {order.customer ? order.customer.name : "No Customer"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input 
                                id="customer_id"
                                type="text"
                                name="customer_id"
                                value={data.customer_id}
                                placeholder="Customer Id"
                                className="hidden"
                                readOnly
                            />

                            <InputError message={errors.customer_id} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label>Payment Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.payment_date ? format(data.payment_date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={data.payment_date}
                                    onSelect={(date) => {
                                        if (date) {
                                            setData("payment_date", format(date, "yyyy-MM-dd"));
                                        }
                                    }}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.payment_date} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="payment_amount">Payment Amount</Label>
                            <Input 
                                id="payment_amount"
                                type="number"
                                step="0.01"
                                name="payment_amount"
                                value={data.payment_amount}
                                className="mt-1 block w-full bg-white"
                                onChange={(e) => setData('payment_amount', e.target.value)}
                            />
                            <InputError message={errors.payment_amount} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="payment_status">Payment Status</Label>
                            <Select 
                                onValueChange={(value) => setData('payment_status', value)} 
                                value={data.payment_status}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Paid">Paid</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Refund">Refund</SelectItem>
                                    <SelectItem value="Failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.payment_status} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor="payment_type">Payment Type</Label>
                            <Select 
                                onValueChange={(value) => setData('payment_type', value)} 
                                value={data.payment_type}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                    <SelectItem value="Gcash">Gcash</SelectItem>
                                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.payment_type} className='mt-2' />
                        </div>

                        <div className="mt-6 flex gap-4">
                            <Button type='submit' disabled={processing}>
                                Submit
                            </Button>
                            <Link href={route('payments.index')}>
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

PaymentEdit.layout = (page) => <MainLayout>{page}</MainLayout>;
