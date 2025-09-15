import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { Head, usePage } from "@inertiajs/react";
import { useMemo } from "react";

import SearchFormContext from "@/hooks/Contexts/SearchFormContext";
import NavigationButtonContext from "@/hooks/Contexts/NavigationButtonContext";
import DeleteButtonContext from "@/hooks/Contexts/DeleteButtonContext";
import UpdateButtonContext from "@/hooks/Contexts/UpdateButtonContext";

import SearchForm from "@/Components/SearchForm";
import UpdateButton from "@/Components/UpdateButton";
import DeleteButton from "@/Components/DeleteButton";
import NavigationButton from "@/Components/NavigationButton";
import { Card } from "@/Components/ui/card";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Separator } from "@/Components/ui/separator";
import { CreateActionSheet } from "@/Components/ActionSheet";
import { Plus } from "lucide-react";
import ProductsCreateForm from "./ProductsCreate";

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
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row, productId }) => {
            productId = row.original.id;
            const deleteContextValue = useMemo(
                () => ({
                    id: productId,
                    deleteRoute: "products.destroy",
                    dataLabel: "Product",
                }),
                [productId]
            );

            const updateContextValue = useMemo(
                () => ({
                    id: productId,
                    updateRoute: "products.edit",
                }),
                [productId]
            );

            return (
                <div className="flex gap-2">
                    <DeleteButtonContext.Provider value={deleteContextValue}>
                        <DeleteButton />
                    </DeleteButtonContext.Provider>

                    <UpdateButtonContext.Provider value={updateContextValue}>
                        <UpdateButton />
                    </UpdateButtonContext.Provider>
                </div>
            );
        },
    },
];

export default function ProductsIndex() {
    const { products, search } = usePage().props;

    return (
        <>
            <Head title="Products" />
            <div className="flex flex-col w-full gap-4">
                <div className="flex">
                    <SidebarTrigger />
                    <p className="text-xl font-bold">Products</p>
                </div>
                <Separator />
                <Card className="p-2">
                    <div>
                        <div className="flex justify-between mb-2 gap-2">
                            <SearchFormContext.Provider
                                value={{
                                    search,
                                    indexRoute: "products.index",
                                    placeholder: "Search Products...",
                                }}
                            >
                                <SearchForm />
                            </SearchFormContext.Provider>

                            <CreateActionSheet
                                title="Create Product"
                                description="Fill up the information of the product here. Click submit when you're done."
                                trigger={
                                    <Button variant="default">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Product
                                    </Button>
                                }
                            >
                                <ProductsCreateForm onSuccess={() => {}} />
                            </CreateActionSheet>
                        </div>

                        <DataTable
                            columns={productCol}
                            data={products?.data || []}
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <NavigationButtonContext.Provider
                            value={{
                                prevPageUrl: products.prev_page_url,
                                nextPageUrl: products.next_page_url,
                                currentPage: products.current_page,
                                lastPage: products.last_page,
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

ProductsIndex.layout = (page) => <MainLayout>{page}</MainLayout>;
