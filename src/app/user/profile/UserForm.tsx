'use client';
import authApi from '@/apis/auth.api';
import userApi from '@/apis/user.api';
import NavHeader from '@/components/NavHeader/NavHeader';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const UserForm = () => {
    const { data:profile , refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile,
        
    });

    const { data: dataProduct, refetch: agvdsgdsg } = useQuery({
        queryKey: ['product'],
        queryFn: authApi.getProductDetail,
    });

    console.log('profile', profile);
    console.log('product', dataProduct);
    

    const handleClick = () => {
        refetch()
        agvdsgdsg()
    }

    return <div>
        <NavHeader />
        <button onClick={handleClick}>click</button>
        UserForm
        <Link href={'/'}>home</Link>
        {/* <h4>{profileData?.data?.data[0].price}</h4> */}
        </div>;
};

export default UserForm;
