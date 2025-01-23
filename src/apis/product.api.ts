import http from '@/utils/http';
import { Product, ProductList, productListConfig } from '../types/product.type';
import { SuccessResponse } from '@/types/utils.type';
import { Category } from '@/types/category.type';

const URL = '/products';

const productApi = {
    getProducts(params: productListConfig) {
        return http.get<SuccessResponse<ProductList>>(URL, params);
    },
    getProductDetail(id: string) {
        return http.get<SuccessResponse<Product>>(`${URL}/${id}`);
    },
    getCategories() {
        return http.get<SuccessResponse<Category[]>>('/categories');
    },
};

export default productApi;
