import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Plus } from "lucide-react";
import OrderCreateForm from "../OrderCreate";

export default function CreateOrderSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    <Plus /> Create Order
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create order from customer</SheetTitle>
                    <SheetDescription>
                        Fill up the information of the order here. Click submit
                        when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <OrderCreateForm />
                </div>
            </SheetContent>
        </Sheet>
    );
}
