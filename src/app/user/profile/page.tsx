import React from 'react';
import UserForm from './UserForm';
import { Metadata } from 'next';
import envConfig from '@/config';


export async function generateMetadata(): Promise<Metadata> {
    const url = envConfig.NEXT_PUBLIC_URL + `/user/profile`
  
    return {
      title: 'User Profile',
      alternates: {
        canonical: url
      },
      robots: {
        index: false
      }
    }
}

const page = () => {
    return (
        <div className="rounded-sm bg-wihte px-2 md:px-7 pb-10 md:pb-20 shadow">
            <div className="border-b border-b-gray-200 py-6">
                <h1 className="text-lg font-medium capitalize text-gray-900">Hồ Sơ Của Tôi</h1>
                <div className="mt-1 text-sm text-gray-700">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <UserForm />
        </div>
    );
};

export default page;
