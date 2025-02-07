import productApi from '@/apis/product.api';
import { productListConfig, ProductList } from '@/types/product.type';
import { Category } from '@/types/category.type';
import AsideFilter from './components/AsideFilter/AsideFilter';
import SortProductList from './components/SortPRroductList/SortProductList';
import Product from './components/Product/Product';
import Pagination from '@/components/Pagination/Pagination';
import Image from 'next/image';
import bgNotFound from '../../../../../public/bgNotFound.png';
import { handleQueryConfig } from '@/lib/utils';
import { QueryConfig } from '@/types/utils.type';
import { Metadata } from 'next';
import envConfig from '@/config';
import queryString from 'query-string';
import { baseOpenGraph } from '@/shared-metadata';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const queryConfig = handleQueryConfig(searchParams as QueryConfig);
    const url = envConfig.NEXT_PUBLIC_URL + '/?' + queryString.stringify(queryConfig).toString();
    return {
        openGraph: {
            ...baseOpenGraph,
        },
        alternates: {
            canonical: url
        },
    }
}

const page = async ({ searchParams }: { searchParams: QueryConfig }) => {
    const queryConfig = handleQueryConfig(searchParams);
    let productData: ProductList;
    let categoriesData: Category[] = [];

    try {
        const productList = await productApi.getProducts(queryConfig as productListConfig);
        const categoriesList = await productApi.getCategories();
        productData = productList.data.data;
        categoriesData = categoriesList.data.data;
    } catch (error) {
        return <div>Something went wrong</div>;
    }

    return (
        <>
            <div className="container">
                {productData && productData.products.length > 0 && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                            <AsideFilter categories={categoriesData || []} queryConfig={queryConfig} />
                        </div>
                        <div className="col-span-9">
                            <SortProductList queryConfig={queryConfig} pageSize={productData.pagination.page_size} />
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {productData.products.map((product) => (
                                    <div className="col-span-1" key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))}
                            </div>
                            <Pagination queryConfig={queryConfig} pageSize={productData.pagination.page_size} />
                        </div>
                    </div>
                )}
                {!productData ||
                    (productData.products.length <= 0 && (
                        <div className="pt-[100px] pb-[120px]">
                            <Image src={bgNotFound} alt="Not found" width={134} height={134} className="m-auto" />
                            <div className="text-center">Không tìm thấy sản phẩm phù hợp</div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default page;
