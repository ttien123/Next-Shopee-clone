import ProductRating from '@/components/ProductRating/ProductRating';
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '@/lib/utils';
import { Product as productType } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    product: productType;
}

const Product = ({ product }: Props) => {
    return (
        <Link href={`/${generateNameId({ name: product.name, id: product._id })}`}>
            <div className="bg-white shadow rounded-sm overflow-hidden hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform">
                <div className="w-full pt-[100%] relative">
                    <Image
                        width={200}
                        height={200}
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 bg-white w-full h-full object-cover"
                    />
                </div>
                <div className="p-2 overflow-hidden">
                    <div className="min-h-[2rem] line-clamp-2 text-xs">{product.name}</div>
                    <div className="flex items-center mt-3">
                        <div className="line-through max-w-[50%] text-gray-500 truncate">
                            <span className="text-xs">₫</span>
                            <span className="text-sm">{formatCurrency(product.price_before_discount)}</span>
                        </div>
                        <div className="text-orange truncate ml-1">
                            <span className="text-xs">₫</span>
                            <span className="text-sm">{formatCurrency(product.price)}</span>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <ProductRating rating={product.rating} activeClassName="fill-orange text-orange w-3 h-3" nonActiveClassName="fill-gray-300 text-gray-300 w-3 h-3"/>
                        <div className="ml-2 text-sm">
                            <span>₫{formatNumberToSocialStyle(product.sold)}</span>
                            <span className="ml-1">Đã bán</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Product;
