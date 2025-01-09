'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formAuthSchema, FormAuthSchema } from '@/utils/rules';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/auth.api';

const LoginForm = () => {
    const form = useForm<FormAuthSchema>({
        resolver: zodResolver(formAuthSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: (body: FormAuthSchema) => authApi.login(body),
    });

    function onSubmit(data: FormAuthSchema) {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }

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
                                        <Input placeholder="Password" {...field} />
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
