'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserSideNav = () => {
    const pathName = usePathname()
    console.log('pathName', pathName);
    
    // const { profile } = useContext(AppContext);
    const profile: any = {}
    return (
        <div>
            <div className="flex items-center border-b border-b-gray-200 py-4 overflow-hidden">
                <Link
                    href={'/user/profile'}
                    className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10"
                >
                    {/* <Image src={getAvatarUrl(profile?.avatar)} alt="avatar" className="h-full w-full object-cover" /> */}
                </Link>
                <div className="flex-grow pl-4">
                    <div className="mb-1 truncate font-semibold text-gray-600">{profile?.name}</div>
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
                    className={`flex items-center capitalize  transition-colors ${pathName === '/user/profile' ? 'text-orange' : 'text-gray-600'}`}
                >
                    <div className="mr-3 h-[22px] w-[22px]">
                        <img
                            src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
                            alt="avatar"
                            className="w-full h-full"
                        />
                    </div>
                    Tài khoản của tôi
                </Link>
                <Link
                    href={'/'}
                    className={`flex mt-4 items-center capitalize  transition-colors ${pathName === '/user/password' ? 'text-orange' : 'text-gray-600'}`}
                    
                >
                    <div className="mr-3 h-[22px] w-[22px]">
                        <img
                            src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    Đổi mật khẩu
                </Link>
                <Link
                    href={'/'}
                    className={`flex mt-4 items-center capitalize  transition-colors ${pathName === '/user/purchase' ? 'text-orange' : 'text-gray-600'}`}
                >
                    <div className="mr-3 h-[22px] w-[22px]">
                        <img src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" />
                    </div>
                    Đơn mua
                </Link>
            </div>
        </div>
    );
};

export default UserSideNav;
