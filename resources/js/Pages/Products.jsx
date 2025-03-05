import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <MainLayout>
            <Head title='Products' />
            <h1>Products</h1>
        </MainLayout>
    );
}
