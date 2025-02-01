'use client';
import purchaseApi from '@/apis/purchase.api';
import Loading from '@/components/Loading/Loading';
import { purchasesStatus, purchaseTabs } from '@/constants/purchase';
import useQueryParams from '@/hooks/useQueryParams';
import { formatCurrency, generateNameId } from '@/lib/utils';
import { PurchaseListStatus } from '@/types/purchase.type';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import queryString from 'query-string';

const HistoryPurchase = () => {
    const queryParams: { status?: string } = useQueryParams();
    const status: number = Number(queryParams.status) || purchasesStatus.all;

    const { data: purchaseInCartData, isFetching } = useQuery({
        queryKey: ['purchase', { status }],
        queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus }),
    });

    const purchasesInCart = purchaseInCartData?.data.data;
    return (
        <div>
            <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                    <div className="sticky top-0 flex rounded-t-sm shadow-sm">
                        {purchaseTabs.map((tab) => (
                            <Link
                                key={tab.status}
                                href={{
                                    pathname: '/user/purchase',
                                    search: queryString
                                        .stringify({
                                            status: String(tab.status),
                                        })
                                        .toString(),
                                }}
                                className={classNames(
                                    'flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center',
                                    {
                                        'border-b-orange text-orange': status === tab.status,
                                        'border-b-black/10 text-gray-900': status !== tab.status,
                                    },
                                )}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>
                    <div>
                        {!isFetching ? (
                            purchasesInCart?.map((purchase) => (
                                <div
                                    key={purchase._id}
                                    className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm"
                                >
                                    <Link
                                        href={`/${generateNameId({
                                            name: purchase.product.name,
                                            id: purchase.product._id,
                                        })}`}
                                        className="flex"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                width={200}
                                                height={200}
                                                className="h-20 w-20 object-cover"
                                                src={purchase.product.image}
                                                alt={purchase.product.name}
                                            />
                                        </div>
                                        <div className="ml-3 flex-grow overflow-hidden">
                                            <div className="truncate">{purchase.product.name}</div>
                                            <div className="mt-3">{purchase.buy_count}</div>
                                        </div>
                                        <div className="ml-3 flex-shrink-0">
                                            <span className="truncate text-gray-500 line-through">
                                                ₫{formatCurrency(purchase.product.price_before_discount)}
                                            </span>
                                            <span className="truncate ml-2 text-orange">
                                                ₫{formatCurrency(purchase.product.price)}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="flex justify-end">
                                        <span>Tổng giá tiền</span>
                                        <span className="ml-4 text-xl text-orange">
                                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Loading extendClassName="min-h-[50vh] bg-gray-100" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPurchase;
