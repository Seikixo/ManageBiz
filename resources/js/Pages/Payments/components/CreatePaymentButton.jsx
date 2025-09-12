import { Button } from "@/Components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Plus } from "lucide-react";
import PaymentCreateForm from "./PaymentCreate";

export default function CreatePaymentButton() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    <Plus /> Create Payment
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create payment from customer</SheetTitle>
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
