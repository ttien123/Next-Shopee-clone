'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import InputNumber from '@/components/InputNumber/InputNumber';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PriceSchema } from '@/utils/rules';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { QueryConfig } from '@/types/utils.type';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useEffect } from 'react';

interface Props {
    queryConfig: QueryConfig;
}

type FormData = {
    price_max: string;
    price_min: string;
};
const PriceFilter = ({ queryConfig }: Props) => {
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(PriceSchema),
        defaultValues: {
            price_max: '',
            price_min: '',
        },
    });

    function onSubmit(data: FormData) {
        router.push(
            `/?${queryString.stringify({
                ...queryConfig,
                price_max: data.price_max,
                price_min: data.price_min,
                page: 1,
                limit: 20,
            })}`,
        );
    }

    useEffect(() => {
        if (!queryConfig.price_max && !queryConfig.price_min) {
            form.reset();
        }
    }, [queryConfig, form]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                <div className="flex items-start">
                    <FormField
                        control={form.control}
                        name="price_min"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputNumber
                                        type="text"
                                        className="grow"
                                        placeholder="₫ TỪ"
                                        classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                                        onChange={(event) => {
                                            field.onChange(event);
                                            form.trigger('price_min');
                                        }}
                                        value={field.value}
                                        classNameError="hidden"
                                        ref={field.ref}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="mx-2 mt-2 shrink-0">-</div>
                    <FormField
                        control={form.control}
                        name="price_max"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputNumber
                                        type="text"
                                        className="grow"
                                        placeholder="₫ ĐẾN"
                                        classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                                        onChange={(event) => {
                                            field.onChange(event);
                                            form.trigger('price_min');
                                        }}
                                        value={field.value}
                                        classNameError="hidden"
                                        ref={field.ref}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mt-1 text-red-600 min-h-[1rem] text-base text-center">
                    {form.formState.errors.price_min?.message}
                </div>
                <ButtonCustom
                    type="submit"
                    aria-label="Search"
                    className="w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex items-center justify-center "
                >
                    Áp dụng
                </ButtonCustom>
            </form>
        </Form>
    );
};

export default PriceFilter;
