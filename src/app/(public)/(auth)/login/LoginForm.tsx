'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthSchema, TypeAuthSchema } from '@/utils/rules';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/auth.api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSetProfile from '@/store/auth.store';
import { clearLSNoRedirect, setProfileToLS } from '@/utils/storage';

type LoginTypeForm = Pick<TypeAuthSchema, 'email' | 'password'>;
const loginSchema = AuthSchema.pick({
    email: true,
    password: true,
});

const LoginForm = () => {
    const router = useRouter();
    const { setProfile } = useSetProfile();
    const form = useForm<LoginTypeForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: (body: LoginTypeForm) => authApi.svLogin(body),
    });

    function onSubmit(data: LoginTypeForm) {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setProfile(data.data.data.user);
                setProfileToLS(data.data.data.user);
                router.push('/');
            },
            onError: (error: any) => {
                const formError = error?.response?.data.data.data;
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        form.setError(key as any, {
                            message: formError[key as any],
                            type: 'Server',
                        });
                    });
                }
            },
        });
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            clearLSNoRedirect();
            setProfile(null);
        }
    }, [setProfile]);

    return (
        <div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ButtonCustom
                            type="submit"
                            disabled={loginMutation.isPending}
                            className=" flex justify-center items-center w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                        >
                            {loginMutation.isPending && <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx={12}
                                    cy={12}
                                    r={10}
                                    stroke="currentColor"
                                    strokeWidth={4}
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>}
                            {!loginMutation.isPending && <span>Đăng nhập</span>}
                        </ButtonCustom>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
