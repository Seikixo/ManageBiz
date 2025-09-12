import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "@/Components/DataTable";
import { Head, usePage } from "@inertiajs/react";
import { Banknote, Loader, RotateCcw, CircleX } from "lucide-react";

import SearchFormContext from "@/hooks/Contexts/SearchFormContext";
import CreateButtonContext from "@/hooks/Contexts/CreateButtonContext";
import NavigationButtonContext from "@/hooks/Contexts/NavigationButtonContext";
import DeleteButtonContext from "@/hooks/Contexts/DeleteButtonContext";
import UpdateButtonContext from "@/hooks/Contexts/UpdateButtonContext";

import CreateButton from "@/Components/CreateButton";
import SearchForm from "@/Components/SearchForm";
import UpdateButton from "@/Components/UpdateButton";
import DeleteButton from "@/Components/DeleteButton";
import NavigationButton from "@/Components/NavigationButton";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Separator } from "@/Components/ui/separator";
import CreatePaymentButton from "./components/CreatePaymentButton";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Refund: "bg-blue-100 text-blue-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
};

const paymentCardColor = {
    Pending: "text-yellow-800",
    Refund: "text-blue-800",
    Paid: "text-green-800",
    Failed: "text-red-800",
};

const paymentCol = [
    {
        accessorKey: "order_id",
        header: "Order ID",
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
    },
    {
        accessorKey: "payment_date",
        header: "Payment Date",
    },
    {
        accessorKey: "payment_amount",
        header: "Payment Amount",
        cell: ({ row }) => {
            const paymentAmount = row.original.payment_amount;

            return (
                <>
                    <span>₱{Number(paymentAmount).toLocaleString()}</span>
                </>
            );
        },
    },
    {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: ({ row }) => {
            const paymentStatus = row.original.payment_status;

            return (
                <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                        statusColors[paymentStatus] ||
                        "bg-gray-100 text-gray-800"
                    }`}
                >
                    {paymentStatus}
                </span>
            );
        },
    },
    {
        accessorKey: "payment_type",
        header: "Payment Type",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row, paymentId }) => {
            paymentId = row.original.id;

            return (
                <div className="flex gap-2">
                    <DeleteButtonContext.Provider
                        value={{
                            id: paymentId,
                            deleteRoute: "payments.destroy",
                            dataLabel: "Payment",
                        }}
                    >
                        <DeleteButton />
                    </DeleteButtonContext.Provider>

                    <UpdateButtonContext.Provider
                        value={{ id: paymentId, updateRoute: "payments.edit" }}
                    >
                        <UpdateButton />
                    </UpdateButtonContext.Provider>
                </div>
            );
        },
    },
];

export default function PaymentsIndex() {
    const { payments, search, statusesCount } = usePage().props;

    return (
        <>
            <Head title="Payments" />
            <div className="flex flex-col w-full gap-4">
                <div className="flex">
                    <SidebarTrigger />
                    <p className="text-xl font-bold">Payments</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-1/2 md:h-1/3 lg:h-1/5 gap-2 mb-10">
                    {statusesCount.map(({ status, count }) => (
                        <Card
                            key={status}
                            className={`${paymentCardColor[status]}`}
                        >
                            <CardHeader className="flex flex-row gap-2">
                                {status}
                                {status === "Paid" && (
                                    <Banknote className="w-6 h-6 text-green-800" />
                                )}
                                {status === "Pending" && (
                                    <Loader className="w-6 h-6 text-yellow-800" />
                                )}
                                {status === "Refund" && (
                                    <RotateCcw className="w-6 h-6 text-blue-800" />
                                )}
                                {status === "Failed" && (
                                    <CircleX className="w-6 h-6 text-red-800" />
                                )}
                            </CardHeader>
                            <CardContent className="text-4xl">
                                {count}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="p-2">
                    <div>
                        <div className="flex justify-between mb-2 gap-2">
                            <SearchFormContext.Provider
                                value={{
                                    search,
                                    indexRoute: "payments.index",
                                    placeholder: "Search Customer...",
                                }}
                            >
                                <SearchForm />
                            </SearchFormContext.Provider>

                            <CreatePaymentButton />
                        </div>

                        <DataTable
                            columns={paymentCol}
                            data={payments?.data || []}
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <NavigationButtonContext.Provider
                            value={{
                                prevPageUrl: payments.prev_page_url,
                                nextPageUrl: payments.next_page_url,
                                currentPage: payments.current_page,
                                lastPage: payments.last_page,
                            }}
                        >
                            <NavigationButton />
                        </NavigationButtonContext.Provider>
                    </div>
                </Card>
            </div>
        </>
    );
}

PaymentsIndex.layout = (page) => <MainLayout>{page}</MainLayout>;
