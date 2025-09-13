import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CustomerCreateForm() {
    const { data, post, processing, errors, wasSuccessful, setData } = useForm({
        name: "",
        address: "",
        contact_number: "",
        email: "",
    });

    useEffect(() => {
        if (wasSuccessful) {
            toast.success("Customer created successfully!", {
                position: "bottom-left",
                duration: 3000,
            });
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        post(route("customers.store"), { data });
    };

    return (
        <>
            <Head title="Create Customers" />
            <div>
                <div>
                    <p className="text-xl font-bold mb-4">Create Customers</p>
                </div>

                <div className="w-full">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <Label className="text-gray-600">
                                This will be the customer name
                            </Label>
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="address">Address</Label>

                            <Input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            <Label className="text-gray-600">
                                You can add description of the customer
                            </Label>
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="contact_number">
                                Contact Number
                            </Label>
                            <Input
                                id="contact_number"
                                type="text"
                                name="contact_number"
                                value={data.contact_number}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                            />
                            <Label className="text-gray-600">
                                This will be the customer contact number
                            </Label>
                            <InputError
                                message={errors.contact_number}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <Label className="text-gray-600">
                                This will be the email of the customer
                            </Label>
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            className="mt-8 w-full"
                            type="submit"
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
