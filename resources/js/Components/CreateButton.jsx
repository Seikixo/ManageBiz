import { Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Plus } from "lucide-react";
import { useContext } from 'react';
import { CreateButtonContext } from '@/Pages/Products/ProductsIndex.jsx'

const CreateButton = () => {
    const createRoute = useContext(CreateButtonContext);

    return(

        <Link href={route(createRoute)}>
            <Button className="flex gap-2 justify-center bg-blue-400" variant='outline'>
                <Plus/>
                Create
            </Button>
        </Link>
    );
};

export default CreateButton;