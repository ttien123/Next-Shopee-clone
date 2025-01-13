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

type LoginTypeForm = Pick<TypeAuthSchema, 'email' | 'password'>
const loginSchema = AuthSchema.pick({
    email: true,
    password: true,
})

const LoginForm = () => {
    const router = useRouter()
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
                router.push('/user/profile')
            },
            onError: (error: any) => {
                const formError = error?.response?.data.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        form.setError(key as any, {
                            message: formError[key as any],
                            type: 'Server'
                        });
                    });
                }
            },
        });
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }, [])

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
                            className=" flex justify-center items-center w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                        >
                            Đăng nhập
                        </ButtonCustom>
                    </form>
                </Form>
               
            </div>
        </div>
    );
};

export default LoginForm;
