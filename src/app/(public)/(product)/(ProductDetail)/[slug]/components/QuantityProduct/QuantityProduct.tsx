'use client';
import QuantityController from '@/components/QuantityController';
import { useState } from 'react';
import { Product as ProductType } from '@/types/product.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import purchaseApi from '@/apis/purchase.api';
import useGetStore from '@/store/store';
import { purchasesStatus } from '@/constants/purchase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface props {
    product: ProductType;
}
const QuantityProduct = ({ product }: props) => {
    const { setProductChoice } = useGetStore();
    const [buyCount, setBuyCount] = useState(1);
    const queryClient = useQueryClient();

    const router = useRouter();
    const { profile } = useGetStore();
    const handleBuyCount = (value: number) => {
        setBuyCount(value);
    };

    const addToCartMutation = useMutation({
        mutationFn: purchaseApi.addToCart,
    });

    const addToCart = () => {
        if (!!profile) {
            addToCartMutation.mutate(
                { buy_count: buyCount, product_id: product?._id as string },
                {
                    onSuccess: (data) => {
                        queryClient.invalidateQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] });
                        toast.success(data.data.message, {
                            autoClose: 1000,
                        });
                    },
                },
            );
        } else {
            router.push('/login');
        }
    };

    const buyNow = async () => {
        if (!!profile) {
            const res = await addToCartMutation.mutateAsync({
                buy_count: buyCount,
                product_id: product?._id as string,
            });
            const purchase = res.data.data;
            setProductChoice(purchase);
            router.push('/cart');
        } else {
            router.push('/login');
        }
    };
    return (
        <>
            <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500 mr-6">Số lượng</div>
                <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.quantity}
                />
                <div className="ml-6 text-sm text-gray-500">{product.quantity} Sản phẩm có sẵn</div>
            </div>
            <div className="mt-8 flex items-center">
                <button
                    onClick={addToCart}
                    className="flex h-12 items-center justify-center rounded-sm border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5"
                >
                    <svg
                        enableBackground="new 0 0 15 15"
                        viewBox="0 0 15 15"
                        x={0}
                        y={0}
                        className="mr-[10px] h-5 w-5 fill-current stroke-orange text-orange"
                    >
                        <g>
                            <g>
                                <polyline
                                    fill="none"
                                    points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                />
                                <circle cx={6} cy="13.5" r={1} stroke="none" />
                                <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                            </g>
                            <line
                                fill="none"
                                strokeLinecap="round"
                                strokeMiterlimit={10}
                                x1="7.5"
                                x2="10.5"
                                y1={7}
                                y2={7}
                            />
                            <line
                                fill="none"
                                strokeLinecap="round"
                                strokeMiterlimit={10}
                                x1={9}
                                x2={9}
                                y1="8.5"
                                y2="5.5"
                            />
                        </g>
                    </svg>
                    Thêm vào giỏ hàng
                </button>
                <button
                    onClick={buyNow}
                    className="ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90"
                >
                    Mua ngay
                </button>
            </div>
        </>
    );
};

export default QuantityProduct;
