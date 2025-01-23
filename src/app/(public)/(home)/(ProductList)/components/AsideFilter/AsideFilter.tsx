'use client'
import { QueryConfig } from "@/hooks/useQueryConfig";
import { Category } from "@/types/category.type";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import queryString from 'query-string';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaPrice } from "@/utils/rules";
import { useRouter } from "next/navigation";
import ButtonCustom from "@/components/ButtonCustom/ButtonCustom";
import InputNumber from "@/components/InputNumber/InputNumber";
import RatingStars from "../RatingStars/RatingStars";
import { omit } from "lodash";
interface Props {
    queryConfig: QueryConfig;
    categories: Category[];
}

type FormData = {
    price_max: string;
    price_min: string;
}



const AsideFilter = ({  categories, queryConfig }: Props) => {
    const { category } = queryConfig;
    const router = useRouter()
    const form = useForm<FormData>({
        resolver: zodResolver(SchemaPrice),
        defaultValues: {
            price_max: '',
            price_min: ''
        },
    });

    function onSubmit(data: FormData) {
        router.push(`/?${queryString.stringify({ ...queryConfig, price_max: data.price_max, price_min: data.price_min })}`);
    }
    
    const handleRemoveAll = () => {
        form.reset(),
        router.push(`/?${queryString.stringify(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter']),).toString()}`)
    };
    return (
        <div className="py-4">
            <Link
                href={'/'}
                className={`flex items-center font-bold ${!true ? 'text-orange' : ''}`}
            >
                <svg viewBox="0 0 12 10" className="w-3 h-4 mr-3 fill-current icon-all-cate">
                    <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                        <g transform="translate(-373 -208)">
                            <g transform="translate(155 191)">
                                <g transform="translate(218 17)">
                                    <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Tất cả danh mục
            </Link>
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <ul className="">
                {categories.map((categoryItem) => {
                    const isActive = category === categoryItem._id;
                    return (
                        <li className="py-2 pl-2" key={categoryItem._id}>
                            <Link
                                href={{
                                    pathname: '/',
                                    search: queryString.stringify({
                                        ...queryConfig,
                                        category: categoryItem._id,
                                    }).toString(),
                                }}
                                className={`relative px-2 ${isActive ? 'text-orange font-semibold' : ''}`}
                            >
                                {isActive && (
                                    <svg viewBox="0 0 4 7" className="fill-orange h-2 w-2 absolute top-1 left-[-10px]">
                                        <polygon points="4 3.5 0 0 0 7" />
                                    </svg>
                                )}
                                {categoryItem.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Link href={'/'} className="flex items-center font-bold mt-4 uppercase">
                <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="w-3 h-4 fill-current stroke-current mr-3"
                >
                    <g>
                        <polyline
                            fill="none"
                            points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                Bộ lọc tìm kiếm
            </Link>
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <div className="my-5">
                <div>Khoảng giá</div>
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
                            className="w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex items-center justify-center "
                        >
                            Áp dụng
                        </ButtonCustom>
                    </form>
                </Form>
            </div>
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <div className="text-sm">Đánh giá</div>
            <RatingStars queryConfig={queryConfig} />
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <ButtonCustom
                onClick={handleRemoveAll}
                className="w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex items-center justify-center "
            >
                Xóa tất cả
            </ButtonCustom>
        </div>
    );
};

export default AsideFilter;
