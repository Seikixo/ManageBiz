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
import ProductionsCreateForm from "../ProductionsCreate";

export default function CreateProductionSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="default">
                    <Plus /> Create Production
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create production</SheetTitle>
                    <SheetDescription>
                        Fill up the information of the production here. Click
                        submit when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <ProductionsCreateForm />
                </div>
            </SheetContent>
        </Sheet>
    );
}
