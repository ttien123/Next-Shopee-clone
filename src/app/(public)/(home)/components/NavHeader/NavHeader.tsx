'use client'
import authApi from '@/apis/auth.api';
import useSetProfile from '@/store/auth.store';
import { User } from '@/types/user.type';
import { clearLSNoRedirect, getProfileFromLS } from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavHeader = () => {
    // const queryClient = useQueryClient();
    const [localProfile, setLocalProfile] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            return getProfileFromLS()
        }
        return null
    });

    // const logoutMutation = useMutation({
    //     mutationFn: authApi.logout,
    //     onSuccess: () => {
    //         setIsAuthenticated(false);
    //         setProfile(null);
    //         queryClient.removeQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] });
    //     },
    // });

    // const handleLogout = () => {
    //     logoutMutation.mutate();
    // };


    return (
        <div className="flex justify-end">
            {/* <Popover
                className="ml-2 flex items-center py-1 hover:text-white/70 cursor-pointer"
                renderPopover={
                    <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                        <Link
                            to={path.profile}
                            className="block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left"
                        >
                            Tài khoản của tôi
                        </Link>
                        <Link
                            to={path.historyPurchase}
                            className="block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left"
                        >
                            Đơn mua
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left"
                        >
                            Đăng xuất
                        </button>
                    </div>
                }
            >
                <div className="w-6 h-6 mr-2 flex-shrink-0">
                    <img
                        src={getAvatarUrl(profile?.avatar)}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <div>{profile?.email}</div>
            </Popover> */}

            {localProfile && (
                <div>
                    <div className="w-6 h-6 mr-2 flex-shrink-0">
                        <Image
                            width={100}
                            height={100}
                            src={`https://api-ecom.duthanhduoc.com/images/${localProfile?.avatar}` || ''}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div>{localProfile?.email}</div>
                </div>
            )}

            {!localProfile && (
                <div className="flex items-center">
                    <Link href={'/register'} className="mx-3 capitalize hover:text-white/70">
                        Đăng ký
                    </Link>
                    <div className="border-r-[1px] border-r-white/40 h-4"></div>
                    <Link href={'/login'} className="mx-3 capitalize hover:text-white/70">
                        Đăng nhập
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavHeader;
