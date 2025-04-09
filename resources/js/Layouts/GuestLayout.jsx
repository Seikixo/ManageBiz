import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex static min-h-screen flex-col items-center justify-center bg-slate-100 py-12 dark:bg-gray-900">

            <div className="absolute left-4 top-4 flex flex-row items-center sm:left-8 sm:top-6">
                <Link href="/">
                    <ApplicationLogo className="h-10 w-10 fill-current text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 sm:h-12 sm:w-12" />
                </Link>
                <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-300 sm:ml-3 sm:text-xl">ManageBiz</span>
            </div>
            
            <div className="w-full relative max-w-md px-6 py-4 sm:max-w-lg md:px-8">
                {children}
            </div>
            
        </div>
    );
}
