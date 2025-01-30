import { Category } from '@/types/category.type';
import Link from 'next/link';

import queryString from 'query-string';

import RatingStars from '../RatingStars/RatingStars';
import omit from 'lodash/omit';
import { QueryConfig } from '@/types/utils.type';
import PriceFilter from './PriceFilter';
interface Props {
    queryConfig: QueryConfig;
    categories: Category[];
}

const AsideFilter = ({ categories, queryConfig }: Props) => {
    const { category } = queryConfig;

    return (
        <div className="py-4">
            <Link href={'/'} className={`flex items-center font-bold ${!true ? 'text-orange' : ''}`}>
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
                                    search: queryString
                                        .stringify({
                                            ...queryConfig,
                                            category: categoryItem._id,
                                        })
                                        .toString(),
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
                <PriceFilter queryConfig={queryConfig}/>
            </div>
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <div className="text-sm">Đánh giá</div>
            <RatingStars queryConfig={queryConfig} />
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <Link
                href={`/?${queryString
                    .stringify(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter']))
                    .toString()}`}
                className="w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex items-center justify-center "
            >
                Xóa tất cả
            </Link>
        </div>
    );
};

export default AsideFilter;
