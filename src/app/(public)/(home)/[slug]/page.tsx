import productApi from '@/apis/product.api';
import { formatCurrency, formatNumberToSocialStyle, getIdFromSlugUrl, rateSale } from '@/lib/utils';
import { Product as ProductType, ProductList, productListConfig } from '@/types/product.type';
import Product from '../(ProductList)/components/Product/Product';
import ProductRating from '@/components/ProductRating/ProductRating';
import ImageProduct from './components/ImageProduct/ImageProduct';
import QuantityProduct from './components/QuantityProduct/QuantityProduct';

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
    const id = getIdFromSlugUrl(slug);
    let productsData: ProductList;
    let product: ProductType;
    try {
        const productDetailApi = await productApi.getProductDetail(id);
        const queryConfig: productListConfig = {
            limit: '20',
            page: '1',
            category: productDetailApi.data.data.category._id,
        };
        const productList = await productApi.getProducts(queryConfig);
        productsData = productList.data.data;
        product = productDetailApi.data.data;
    } catch (error) {
        return <div>Something went wrong</div>;
    }


    return (
        <div className="bg-gray-200 py-6">
            <div className="container">
                <div className="bg-white p-4 shadow">
                    <div className="grid grid-cols-12 gap-9 wrap">
                        <div className="col-span-5">
                            <ImageProduct product={product}/>
                        </div>
                        <div className="col-span-7">
                            <h1 className="text-xl font-medium uppercase">{product.name}</h1>
                            <div className="mt-8 flex items-center">
                                <div className="flex items-center">
                                    <span className="mr-1 border-b border-b-orange text-orange">{product.rating}</span>
                                    <ProductRating
                                        rating={product.rating}
                                        activeClassName="fill-orange text-orange h-4 w-4"
                                        nonActiveClassName="fill-gray-300 text-gray-300 h-4 w-4"
                                    />
                                </div>
                                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                                <div>
                                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                                    <span className="ml-1 text-gray-500">Đã bán</span>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                                <div className="text-gray-500 line-through">
                                    ₫{formatCurrency(product.price_before_discount)}
                                </div>
                                <div className="ml-3 text-3xl font-medium text-orange">
                                    ₫{formatCurrency(product.price)}
                                </div>
                                <div className="ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white">
                                    {rateSale(product.price_before_discount, product.price)} giảm
                                </div>
                            </div>
                            <QuantityProduct product={product}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="container">
                    <div className="bg-white p-4 shadow">
                        <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
                            <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                                <div>{product.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="container">
                    <div className="uppercase text-gray-400">CÓ THỂ BẠN CŨNG THÍCH</div>
                    {productsData && (
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {productsData.products.map((product) => (
                                <div className="col-span-1" key={product._id}>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
