'use client';

import productApi from '@/apis/product.api';
import useQueryConfig from '@/hooks/useQueryConfig';
import { productListConfig } from '@/types/product.type';
import AsideFilter from '../AsideFilter/AsideFilter';
import { useQuery, keepPreviousData, useIsFetching } from '@tanstack/react-query';
import Product from '../Product/Product';
import SortProductList from '../SortPRroductList/SortProductList';
import Pagination from '@/components/Pagination/Pagination';
import Image from 'next/image';
import bgNotFound from '../../../../../../../public/bgNotFound.png';
import Loading from '@/components/Loading/Loading';
const ListProduct = () => {
    const queryConfig = useQueryConfig();
    const { data: productData, isFetching } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getProducts(queryConfig as productListConfig);
        },
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData,
    });

    const { data: categoriesData, isFetching: isFetchingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return productApi.getCategories();
        },
        staleTime: 3 * 60 * 1000,
    });
    return (
        <>
            <div className="container">
                {productData && productData.data.data.products.length > 0 && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                            <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
                        </div>
                        <div className="col-span-9">
                            <SortProductList
                                queryConfig={queryConfig}
                                pageSize={productData.data.data.pagination.page_size}
                            />
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {productData.data.data.products.map((product) => (
                                    <div className="col-span-1" key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                queryConfig={queryConfig}
                                pageSize={productData.data.data.pagination.page_size}
                            />
                        </div>
                    </div>
                )}
                {!productData ||
                    (productData.data.data.products.length <= 0 && (
                        <div className="pt-[100px] pb-[120px]">
                            <Image src={bgNotFound} alt="Not found" width={134} height={134} className="m-auto" />
                            <div className="text-center">Không tìm thấy sản phẩm phù hợp</div>
                        </div>
                    ))}
                {(isFetching || isFetchingCategories) && <Loading />}
            </div>
        </>
    );
};

export default ListProduct;
