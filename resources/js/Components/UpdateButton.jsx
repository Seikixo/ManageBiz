import { Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Pencil } from "lucide-react";
import { useUpdateButtonContext } from '@/hooks/Contexts/UpdateButtonContext';

const UpdateButton = () => {
    const {id,updateRoute} = useUpdateButtonContext();

    return(

        <Link href={route(updateRoute, id)}>
            <Button className="flex gap-2 justify-center bg-green-400" variant='outline'>
                <Pencil/>
                Update
            </Button>
        </Link>
    );
};

export default UpdateButton;