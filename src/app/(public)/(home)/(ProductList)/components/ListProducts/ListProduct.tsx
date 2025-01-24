'use client';

import productApi from '@/apis/product.api';
import useQueryConfig from '@/hooks/useQueryConfig';
import { productListConfig } from '@/types/product.type';
import AsideFilter from '../AsideFilter/AsideFilter';
import { useQuery, keepPreviousData  } from '@tanstack/react-query';
import Product from '../Product/Product';
import SortProductList from '../SortPRroductList/SortProductList';
import Pagination from '@/components/Pagination/Pagination';

const ListProduct = () => {
    const queryConfig = useQueryConfig();

    const { data: productData } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productApi.getProducts(queryConfig as productListConfig);
        },
        staleTime: 3 * 60 * 1000,
        placeholderData: keepPreviousData
    });

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return productApi.getCategories();
        },
    });
    return (
        <>
            <div className="container">
                {productData && (
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
            </div>
        </>
    );
};

export default ListProduct;
