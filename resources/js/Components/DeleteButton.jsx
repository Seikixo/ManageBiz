import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { toast } from 'sonner';
import { useState } from "react";
import { Button } from '@/Components/ui/button';
import { Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { useDeleteButtonContext } from "@/hooks/Contexts/DeleteButtonContext";

const DeleteButton = () => {

    const {id, deleteRoute, dataLabel} = useDeleteButtonContext();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {

        router.delete(route(deleteRoute, id), {
            onSuccess: () => toast.success("Product deleted successfully"),
            onError: () => toast.error("Failed to delete product")
        });
        setOpen(false);
    };

    return(
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            
            <Button className="flex gap-2 justify-center bg-red-400" variant="outline">
                <Trash2/>
                Delete
            </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action can be undone. This will delete the <span className="text-red-600">{dataLabel}</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

    </AlertDialog>
    );
}

export default DeleteButton;