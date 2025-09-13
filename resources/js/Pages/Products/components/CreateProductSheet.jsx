import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import PaymentCreateForm from "@/Pages/Payments/PaymentCreate";
import { Plus } from "lucide-react";
import ProductsCreateForm from "../ProductsCreate";

export default function CreateProductSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    <Plus /> Create Product
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create product</SheetTitle>
                    <SheetDescription>
                        Fill up the information of the product here. Click
                        submit when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <ProductsCreateForm />
                </div>
            </SheetContent>
        </Sheet>
    );
}
