'use client';
import { usePathname } from 'next/navigation';
import { getAvatarUrl } from '@/lib/utils';
import useGetStore from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types/user.type';
const UserSideNav = () => {
    const { profile } = useGetStore();
    const pathname = usePathname();
    const [localProfile, setLocalProfile] = useState<User | null | undefined>(undefined);
    useEffect(() => {
        setLocalProfile(profile);
    }, [profile]);
    return (
        <div>
            <div className="flex items-center border-b border-b-gray-200 py-4 overflow-hidden">
                <Link
                    href={'/user/profile'}
                    className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10"
                >
                    <Image
                        width={40}
                        height={40}
                        src={getAvatarUrl(localProfile?.avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover"
                    />
                </Link>
                <div className="flex-grow pl-4">
                    <div className="mb-1 truncate font-semibold text-gray-600">{localProfile?.name}</div>
                    <Link href={'/user/profile'} className="flex items-center capitalize text-gray-500">
                        <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: 4 }}
                        >
                            <path
                                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                                fill="#9B9B9B"
                                fillRule="evenodd"
                            />
                        </svg>
                        sửa hồ sơ
                    </Link>
                </div>
            </div>
            <div className="mt-7">
                <Link
                    href={'/user/profile'}
                    className={`flex items-center capitalize  transition-colors ${
                        pathname === '/user/profile' ? 'text-orange' : 'text-gray-600'
                    }`}
                >
                    <div className="mr-3 h-[22px] w-[22px]">
                        <Image
                            width={22}
                            height={22}
                            src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
                            alt="avatar"
                            className="w-full h-full"
                        />
                    </div>
                    Tài khoản của tôi
                </Link>
                <Link
                    href={'/user/password'}
                    className={`flex mt-4 items-center capitalize  transition-colors ${
                        pathname === '/user/password' ? 'text-orange' : 'text-gray-600'
                    }`}
                >
                    <div className="mr-3 h-[22px] w-[22px]">
                        <Image
                            width={22}
                            height={22}
                            src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    Đổi mật khẩu
                </Link>
                <Link
                    href={'/user/purchase'}
                    className={`flex mt-4 items-center capitalize  transition-colors ${
                        pathname === '/user/purchase' ? 'text-orange' : 'text-gray-600'
                    }`}
                >
                    <div className="mr-3 h-[22px] w-[22px]">
                        <Image
                            width={22}
                            height={22}
                            alt="icon"
                            src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078"
                        />
                    </div>
                    Đơn mua
                </Link>
            </div>
        </div>
    );
};

export default UserSideNav;
