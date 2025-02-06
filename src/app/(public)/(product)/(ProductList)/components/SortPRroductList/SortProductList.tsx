'use client';

import omit from 'lodash/omit';
import { productListConfig } from '@/types/product.type';
import Link from 'next/link';
import { sortBy, order as orderConstant } from '@/constants/product';
import queryString from 'query-string';
import { useRouter } from 'next/navigation';
import { QueryConfig } from '@/types/utils.type';
// import { omit } from 'lodash';
interface Props {
    queryConfig: QueryConfig;
    pageSize: number;
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
    const { sort_by = sortBy.createdAt, order } = queryConfig;
    const page = Number(queryConfig.page);
    const router = useRouter();
    const isActiveSortBy = (sortByValue: Exclude<productListConfig['sort_by'], undefined>) => {
        return sort_by === sortByValue;
    };

    const handleSort = (sortByValue: Exclude<productListConfig['sort_by'], undefined>) => {
        router.push(
            `?${queryString
                .stringify(
                    omit(
                        {
                            ...queryConfig,
                            sort_by: sortByValue,
                            page: 1,
                            limit: 20,
                        },
                        ['order'],
                    ),
                )
                .toString()}`,
        );
    };

    const handlePriceOrder = (orderValue: Exclude<productListConfig['order'], undefined>) => {
        router.push(
            `/?${queryString
                .stringify({
                    ...queryConfig,
                    sort_by: sortBy.price,
                    order: orderValue,
                    page: 1,
                    limit: 20,
                })
                .toString()}`,
        );
    };
    return (
        <div className="bg-gray-300/40 py-4 px-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center flex-wrap gap-2">
                    <div>Sắp xếp theo</div>
                    <button
                        aria-label="Search"
                        className={`h-8 px-4 capitalize text-sm ${
                            isActiveSortBy(sortBy.view)
                                ? 'bg-orange text-white hover:bg-orange/80'
                                : 'bg-white text-black hover:bg-slate-100'
                        }`}
                        onClick={() => handleSort(sortBy.view)}
                    >
                        Phổ biến
                    </button>

                    <button
                        aria-label="Search"
                        className={`h-8 px-4 capitalize text-sm ${
                            isActiveSortBy(sortBy.createdAt)
                                ? 'bg-orange text-white hover:bg-orange/80'
                                : 'bg-white text-black hover:bg-slate-100'
                        }`}
                        onClick={() => handleSort(sortBy.createdAt)}
                    >
                        Mới nhất
                    </button>
                    <button
                        aria-label="Search"
                        className={`h-8 px-4 capitalize text-sm ${
                            isActiveSortBy(sortBy.sold)
                                ? 'bg-orange text-white hover:bg-orange/80'
                                : 'bg-white text-black hover:bg-slate-100'
                        }`}
                        onClick={() => handleSort(sortBy.sold)}
                    >
                        Bán chạy
                    </button>
                    <select
                        aria-label="Search"
                        className={`h-8 px-4 text-sm text-left outline-none ${
                            isActiveSortBy(sortBy.price)
                                ? 'bg-orange text-white hover:bg-orange/80'
                                : 'bg-white text-black hover:bg-slate-100'
                        }`}
                        value={order || ''}
                        onChange={(e) =>
                            handlePriceOrder(e.target.value as Exclude<productListConfig['order'], undefined>)
                        }
                    >
                        <option disabled value={''} className="bg-white text-black">
                            Giá
                        </option>
                        <option value={orderConstant.asc} className="bg-white text-black">
                            Giá: Thấp đến cao
                        </option>
                        <option value={orderConstant.desc} className="bg-white text-black">
                            Giá: Cao đến thấp
                        </option>
                    </select>
                </div>
                <div className="flex items-center">
                    <div>
                        <span className="text-orange">{page}</span>
                        <span className="">/{pageSize}</span>
                    </div>
                    <div className="ml-2 flex">
                        {page === 1 ? (
                            <span className="flex items-center justify-center h-8 w-9 rounded-tl-sm rounded-bl-sm cursor-not-allowed bg-white/60 hover:bg-slate-100 shadow">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </span>
                        ) : (
                            <Link
                                aria-label="Search"
                                href={{
                                    pathname: '/',
                                    search: queryString
                                        .stringify({
                                            ...queryConfig,
                                            page: (page - 1).toString(),
                                        })
                                        .toString(),
                                }}
                                className="flex items-center justify-center h-8 w-9 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 shadow"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </Link>
                        )}

                        {page === pageSize ? (
                            <span className="flex items-center justify-center h-8 w-9 rounded-tl-sm rounded-bl-sm cursor-not-allowed bg-white/60 hover:bg-slate-100 shadow">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        ) : (
                            <Link
                                aria-label="Search"
                                href={{
                                    pathname: '/',
                                    search: queryString
                                        .stringify({
                                            ...queryConfig,
                                            page: (page + 1).toString(),
                                        })
                                        .toString(),
                                }}
                                className="flex items-center justify-center h-8 w-9 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 shadow"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortProductList;
