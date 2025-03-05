import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <MainLayout>
            <Head title='Dashboard' />
            <h1>Inventory</h1>
        </MainLayout>
    );
}
