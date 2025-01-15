'use client';
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthSchema, TypeAuthSchema, userSchema, UserSchema } from '@/utils/rules';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useMutation } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import DateSelect from '../components/DateSelect/DateSelect';

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>;

const profileSchema = userSchema.pick({
    name: true,
    address: true,
    phone: true,
    date_of_birth: true,
    avatar: true
});

const UserForm = () => {
     const form = useForm<FormData>({
            resolver: zodResolver(profileSchema),
            defaultValues: {
                name: '',
                address: '',
                phone: '',
                date_of_birth: new Date(1990, 0, 1),
                avatar: '',
            },
        });

    const { data , refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile,
        
    });

    const profile = data?.data.data
    

    function onSubmit(data: FormData) {
            console.log('data', data);
            
    }


    function onError(data: any) {
        console.log('error', data);
        
    }
    return <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
                        <div className="mt-6 flex-grow md:pr-12 md:mt-0">
                            <div className="flex flex-wrap flex-col sm:flex-row">
                                <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Email</div>
                                <div className="sm:w-[80%] sm:pl-5">
                                    <div className="pt-3 text-gray-700">{profile?.email}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap flex-col sm:flex-row mt-2">
                                <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Tên
                                </div>
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
                                <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Số Điện thoại</div>
                                <div className="sm:w-[80%] sm:pl-5">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Số điện thoại" {...field} />
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
                                            errorMessage={form.formState.errors.date_of_birth?.message}
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
                                        style={{background: '#ee4d2d'}}
                                        className="flex rounded-sm items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
                                    >
                                        Lưu
                                    </ButtonCustom>
                                </div>
                        </div>
                        </div>
                    </form>
                </Form>
            </div>;
};

export default UserForm;
