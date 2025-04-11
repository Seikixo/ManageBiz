import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"

export default function Login({ status, rememberedEmail = '' }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: rememberedEmail || '',
        password: '',
        remember: !!rememberedEmail,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 rounded-md bg-green-50 p-3 text-sm font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    {status}
                </div>
            )}

            <Card className="w-full shadow-md dark:border-gray-700">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input 
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your.email@example.com"
                            />
                            <InputError message={errors.email} className="text-xs" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="text-xs" />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                name="remember"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <Label htmlFor="remember" className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Remember me
                            </Label>
                        </div>

                        <div className="mt-6 flex flex-col space-y-3">
                            <Button className="w-full" disabled={processing}>
                                Log in
                            </Button>
                            <Link href={route('register')} className="w-full sm:w-auto">
                                <Button variant="outline" type="button" className="w-full">                                
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}