import { Link, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Pencil } from "lucide-react";
import { useUpdateButtonContext } from '@/hooks/Contexts/UpdateButtonContext';
import { memo } from 'react';

const UpdateButton = () => {
    const {id,updateRoute} = useUpdateButtonContext();

    return(

        <Link href={route(updateRoute, id)}>
            <Button className="flex gap-2 justify-center bg-green-400" variant='outline'>
                <Pencil/>
            </Button>
        </Link>
    );
};

export default memo(UpdateButton);