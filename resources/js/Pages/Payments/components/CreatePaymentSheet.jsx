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
import PaymentCreateForm from "../PaymentCreate";

export default function CreatePaymentSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    <Plus /> Create Payment
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create payment of customer</SheetTitle>
                    <SheetDescription>
                        Fill up the information of the payment here. Click
                        submit when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <PaymentCreateForm />
                </div>
            </SheetContent>
        </Sheet>
    );
}
