'use client';
import authApi from '@/apis/auth.api';
import useGetStore from '@/store/store';
import { User } from '@/types/user.type';
import { clearLSNoRedirect, getAccessTokenFromLS, getProfileFromLS } from '@/utils/storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePathname, useRouter } from 'next/navigation';
import { privatePaths } from '@/middleware';
import { purchasesStatus } from '@/constants/purchase';

const NavHeader = () => {
    const [localProfile, setLocalProfile] = useState<User | null | undefined>(undefined);
    const pathname = usePathname();
    const router = useRouter();
    const { profile, setProfile } = useGetStore();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: (accessToken: string) => authApi.svLogout(accessToken),
        onSuccess: () => {
            setProfile(null);
            if (privatePaths.some((path) => pathname.startsWith(path))) {
                router.push('/login');
            }
            queryClient.removeQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] });
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate(getAccessTokenFromLS());
    };

    useEffect(() => {
        setLocalProfile(profile);
    }, [profile]);

    return (
        <div className="flex justify-end min-h-[24px]">
            {localProfile && (
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger className="flex items-center py-1 hover:text-white/70 cursor-pointer">
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
                        </TooltipTrigger>
                        <TooltipContent className="relative pt-2">
                            <span className="absolute z-10 top-[-11px] left-[50%] translate-x-[-50%] border-[11px] border-x-transparent border-t-transparent border-b-white"></span>
                            <div className="bg-white relative text-black shadow-md rounded-sm border border-gray-200">
                                <Link
                                    href={'/user/profile'}
                                    className="block text-[16px] py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left"
                                >
                                    Tài khoản của tôi
                                </Link>
                                <Link
                                    href={'/user/purchase'}
                                    className="block text-[16px] py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left"
                                >
                                    Đơn mua
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block text-[16px] py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            {!localProfile && localProfile !== undefined && (
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
