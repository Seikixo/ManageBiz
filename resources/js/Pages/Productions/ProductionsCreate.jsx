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

export default function ProductionsCreateForm({ onSuccess }) {
    const { products } = usePage().props;

    const { data, post, processing, errors, wasSuccessful, setData } = useForm({
        product_id: "",
        quantity_produced: "",
        production_date: "",
        material_cost: "",
        production_cost: "",
    });

    useEffect(() => {
        if (wasSuccessful) {
            toast.success("Production created successfully!", {
                position: "bottom-left",
                duration: 3000,
            });
            if (onSuccess) onSuccess();
        }
    }, [wasSuccessful, onSuccess]);

    const submit = (e) => {
        e.preventDefault();

        if (!data.production_date) {
            setData("production_date", ""); // Ensure it's empty instead of undefined
        }

        post(route("productions.store"), {
            data: {
                ...data,
                quantity_produced: Number(data.quantity_produced),
                material_cost: Number(data.material_cost),
                production_cost: Number(data.production_cost),
                production_date: data.production_date
                    ? format(new Date(data.production_date), "yyyy-MM-dd")
                    : "", // Ensure valid date
            },
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <>
            <Head title="Create Production" />
            <div>
                <p className="text-xl font-bold mb-4">Create Production</p>

                <div className="w-full">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <Label>Product</Label>
                            <Select
                                onValueChange={(value) =>
                                    setData("product_id", value)
                                }
                                value={data.product_id}
                            >
                                <SelectTrigger className="mt-1 w-full bg-white">
                                    <SelectValue placeholder="Select a product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products?.map((product) => (
                                        <SelectItem
                                            key={product.id}
                                            value={product.id.toString()}
                                        >
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.product_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="quantity_produced">
                                Quantity Produced
                            </Label>
                            <Input
                                id="quantity_produced"
                                type="number"
                                name="quantity_produced"
                                value={data.quantity_produced}
                                className="mt-1 block w-full bg-white"
                                onChange={(e) =>
                                    setData("quantity_produced", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.quantity_produced}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label>Production Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.production_date
                                            ? format(
                                                  data.production_date,
                                                  "PPP"
                                              )
                                            : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.production_date}
                                        onSelect={(date) => {
                                            if (date) {
                                                setData(
                                                    "production_date",
                                                    format(date, "yyyy-MM-dd")
                                                );
                                            }
                                        }}
                                        initialFocus
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError
                                message={errors.production_date}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="material_cost">Material Cost</Label>
                            <Input
                                id="material_cost"
                                type="number"
                                step="0.01"
                                name="material_cost"
                                value={data.material_cost}
                                className="mt-1 block w-full bg-white"
                                onChange={(e) =>
                                    setData("material_cost", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.material_cost}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="production_cost">
                                Production Cost
                            </Label>
                            <Input
                                id="production_cost"
                                type="number"
                                step="0.01"
                                name="production_cost"
                                value={data.production_cost}
                                className="mt-1 block w-full bg-white"
                                onChange={(e) =>
                                    setData("production_cost", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.production_cost}
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
