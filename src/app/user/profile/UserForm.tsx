'use client';

import userApi from '@/apis/user.api';
import useGetStore from '@/store/store';
import { TypeUserInfoSchema, UserInfoSchema } from '@/utils/rules';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DateSelect from '../Components/DateSelect';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import Image from 'next/image';
import { getAvatarUrl } from '@/lib/utils';
import InputNumber from '@/components/InputNumber/InputNumber';
import { toast } from 'react-toastify';
import { setProfileToLS } from '@/utils/storage';
import InputFile from '@/components/InputFile/InputFile';

const UserForm = () => {
    const [file, setFile] = useState<File>();
    const previewImage = useMemo(() => {
        return file ? URL.createObjectURL(file) : '';
    }, [file]);
    const { setProfile } = useGetStore();
    const form = useForm<TypeUserInfoSchema>({
        defaultValues: {
            name: '',
            phone: '',
            avatar: '',
            address: '',
            date_of_birth: new Date(1990, 0, 1),
        },
        resolver: zodResolver(UserInfoSchema),
    });

    const {
        formState: { errors },
        handleSubmit,
        setValue,
        setError,
        watch,
    } = form;

    const { data: profileData, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile,
    });

    const avatar = watch('avatar');

    const profile = profileData?.data.data;

    const updateProfileMutation = useMutation({
        mutationFn: userApi.updateProfile,
    });
    const uploadAvatarMutation = useMutation({
        mutationFn: userApi.uploadAvatar,
    });

    useEffect(() => {
        if (profile) {
            setValue('name', profile.name as string);
            setValue('phone', profile.phone as string);
            setValue('address', profile.address as string);
            setValue('avatar', profile.avatar as string);
            setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
        }
    }, [profile, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let avatarName = avatar;
            if (file) {
                const form = new FormData();
                form.append('image', file);
                const uploadRes = await uploadAvatarMutation.mutateAsync(form);
                avatarName = uploadRes.data.data;
                setValue('avatar', avatarName);
            }
            const res = await updateProfileMutation.mutateAsync({
                ...data,
                date_of_birth: data.date_of_birth?.toISOString(),
                avatar: avatarName,
            });
            setProfileToLS(res.data.data);
            setProfile(res.data.data);
            refetch();
            toast.success(res.data.message, {
                autoClose: 1000,
            });
        } catch (error: any) {
            if (error.response?.status === 422) {
                const formError = error.response?.data;
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof TypeUserInfoSchema, {
                            message: formError[key as keyof TypeUserInfoSchema],
                            type: 'Server',
                        });
                    });
                }
            }
        }
    });

    const handleChangeFile = (file?: File) => {
        setFile(file);
    };
    return (
        <Form {...form}>
            <form className="mt-8 flex flex-col-reverse md:flex-row md:items-start" onSubmit={onSubmit}>
                <div className="mt-6 flex-grow md:pr-12 md:mt-0">
                    <div className="flex flex-wrap flex-col sm:flex-row">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Email</div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <div className="pt-3 text-gray-700">{profile?.email}</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-col sm:flex-row mt-6">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Tên</div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Tên" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-col sm:flex-row mt-2">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Số điện thoại</div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputNumber placeholder="Số điện thoại" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-col sm:flex-row mt-2">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Địa chỉ</div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Địa chỉ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DateSelect
                                        errorMessage={errors.date_of_birth?.message}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
                    <div className="flex flex-col items-center">
                        <div className="my-5 h-24 w-24">
                            <Image
                                width={100}
                                height={100}
                                src={previewImage || getAvatarUrl(avatar)}
                                alt=""
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <InputFile onChange={handleChangeFile} />
                        <div className="mt-3 text-gray-400"></div>
                        <div>Dụng lượng file tối đa 1 MB</div>
                        <div>Định dạng:.JPEG, .PNG</div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default UserForm;
