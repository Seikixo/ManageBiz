import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Card className="w-full shadow-md dark:border-gray-700">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Enter your information to create a new account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                            <InputError message={errors.name} className="text-xs" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your.email@example.com"
                                required
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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <InputError message={errors.password} className="text-xs" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-medium">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <InputError message={errors.password_confirmation} className="text-xs" />
                        </div>

                        <div className="mt-6 flex flex-col space-y-3">
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Already have an account?
                            </Link>

                            <Button className="w-full sm:w-auto" disabled={processing}>
                                Register
                            </Button>
                        </div>
                    </form>
                </CardContent>
                
            </Card>
        </GuestLayout>
    );
}