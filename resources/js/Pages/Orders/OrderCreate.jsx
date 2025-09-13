import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useEffect } from "react";
import { toast } from "sonner";

export default function OrderCreateForm() {
    const { products, customers } = usePage().props;

    const { data, post, processing, errors, wasSuccessful, setData } = useForm({
        customer_id: "",
        order_date: "",
        status: "",
        products: [],
    });

    useEffect(() => {
        if (wasSuccessful) {
            toast.success("Order created successfully!", {
                position: "bottom-left",
                duration: 3000,
            });
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();

        if (!data.order_date) {
            setData("order_date", "");
        }

        post(route("orders.store"), {
            ...data,
            order_date: data.order_date
                ? format(new Date(data.order_date), "yyyy-MM-dd")
                : "",
            products: data.products.map((p) => ({
                product_id: p.product_id,
                quantity: Number(p.quantity),
            })),
        });
    };

    return (
        <>
            <Head title="Create Order" />
            <div>
                <p className="text-xl font-bold mb-4">Create Order</p>

                <div className="w-full">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <Label>Customer</Label>
                            <Select
                                onValueChange={(value) =>
                                    setData("customer_id", value)
                                }
                                value={data.customer_id}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers?.map((customer) => (
                                        <SelectItem
                                            key={customer.id}
                                            value={customer.id.toString()}
                                        >
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.customer_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label>Order Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.order_date
                                            ? format(data.order_date, "PPP")
                                            : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.order_date}
                                        onSelect={(date) => {
                                            setData(
                                                "order_date",
                                                date
                                                    ? format(date, "yyyy-MM-dd")
                                                    : ""
                                            );
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError
                                message={errors.order_date}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label>Status</Label>
                            <Select
                                onValueChange={(value) =>
                                    setData("status", value)
                                }
                                value={data.status}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select order status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="Processing">
                                        Processing
                                    </SelectItem>
                                    <SelectItem value="Delivered">
                                        Delivered
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label className="mr-2">Products</Label>
                            {data.products.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex gap-2 items-center mt-2"
                                >
                                    <Select
                                        onValueChange={(value) => {
                                            const updatedProducts = [
                                                ...data.products,
                                            ];
                                            updatedProducts[index].product_id =
                                                value;
                                            setData(
                                                "products",
                                                updatedProducts
                                            );
                                        }}
                                        value={product.product_id}
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products?.map((prod) => (
                                                <SelectItem
                                                    key={prod.id}
                                                    value={prod.id.toString()}
                                                >
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
                                            const updatedProducts = [
                                                ...data.products,
                                            ];
                                            updatedProducts[index].quantity =
                                                e.target.value;
                                            setData(
                                                "products",
                                                updatedProducts
                                            );
                                        }}
                                        min="1"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            const updatedProducts = [
                                                ...data.products,
                                            ];
                                            updatedProducts.splice(index, 1);
                                            setData(
                                                "products",
                                                updatedProducts
                                            );
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() => {
                                    setData("products", [
                                        ...data.products,
                                        { product_id: "", quantity: 1 },
                                    ]);
                                }}
                            >
                                + Add Product
                            </Button>
                            <InputError
                                message={errors.products}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-8 w-full"
                            disabled={processing}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
