'use client';

import userApi from '@/apis/user.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { TypeUserChangePassword, UserChangePassword } from '@/utils/rules';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputNumber from '@/components/InputNumber/InputNumber';
import { LoadingFullPage } from '@/components/Loading/Loading';

const ChangePasswordSchema = UserChangePassword.refine(
    (values) => {
        return values.password === values.confirm_password;
    },
    {
        message: 'Nhập lại mật khẩu không khớp',
        path: ['confirm_password'],
    },
);

const ChangePasswordForm = () => {
    const form = useForm<TypeUserChangePassword>({
        defaultValues: {
            password: '',
            new_password: '',
            confirm_password: '',
        },
        resolver: zodResolver(ChangePasswordSchema),
    });

    const {
        formState: { errors },
        handleSubmit,
        setError,
        reset,
    } = form;

    const updateProfileMutation = useMutation({
        mutationFn: userApi.updateProfile,
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']));
            reset();
            toast.success(res.data.message, {
                autoClose: 1000,
            });
        } catch (error: any) {
            if (error.response?.status === 422) {
                const formError = error.response?.data;
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof TypeUserChangePassword, {
                            message: formError[key as keyof TypeUserChangePassword],
                            type: 'Server',
                        });
                    });
                }
            }
        }
    });
    return (
        <>
            <Form {...form}>
                <form className="mt-8 mr-auto max-w-2xl" onSubmit={onSubmit}>
                    <div className="mt-6 flex-grow md:pr-12 md:mt-0">
                        <div className="flex flex-wrap flex-col sm:flex-row mt-2">
                            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Mật khẩu cũ</div>
                            <div className="sm:w-[80%] sm:pl-5">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputNumber placeholder="Mật khẩu cũ" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap flex-col sm:flex-row mt-2">
                            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Mật khẩu mới</div>
                            <div className="sm:w-[80%] sm:pl-5">
                                <FormField
                                    control={form.control}
                                    name="new_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputNumber placeholder="Mật khẩu mới" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap flex-col sm:flex-row mt-2">
                            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Nhập lại mật khẩu</div>
                            <div className="sm:w-[80%] sm:pl-5">
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputNumber placeholder="Nhập lại mật khẩu" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
                            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize" />
                            <div className="sm:w-[80%] sm:pl-5">
                                <ButtonCustom
                                    type="submit"
                                    className="flex rounded-sm items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
                                >
                                    Lưu
                                </ButtonCustom>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
            <LoadingFullPage isLoading={updateProfileMutation.isPending} />
        </>
    );
};

export default ChangePasswordForm;
