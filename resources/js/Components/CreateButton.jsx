import { Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Plus } from "lucide-react";
import { useCreateButtonContext } from '@/hooks/Contexts/CreateButtonContext';

const CreateButton = () => {
    const {createRoute} = useCreateButtonContext();

    return(

        <Link href={route(createRoute)}>
            <Button className="flex gap-2 justify-center bg-slate-800 text-white" variant='outline'>
                <Plus/>
                Create
            </Button>
        </Link>
    );
};

export default CreateButton;