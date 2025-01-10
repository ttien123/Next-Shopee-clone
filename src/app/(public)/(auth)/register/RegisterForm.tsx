'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthSchema, TypeAuthSchema } from '@/utils/rules';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/auth.api';

const RegisterSchema = AuthSchema.refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Nhập lại mật khẩu không khớp",
      path: ["confirm_password"],
    }
  )
const RegisterForm = () => {
    const form = useForm<TypeAuthSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const registerMutation = useMutation({
        mutationFn: (body: TypeAuthSchema) => authApi.svRegister(body),
    });

    function onSubmit(data: TypeAuthSchema) {
        registerMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error: any) => {
                const formError = error?.response?.data.data.data
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

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <ButtonCustom
                            type="submit"
                            className=" flex justify-center items-center w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                        >
                            Đăng Ký
                        </ButtonCustom>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
