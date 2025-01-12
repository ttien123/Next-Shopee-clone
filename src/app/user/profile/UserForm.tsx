'use client';
import userApi from '@/apis/user.api';
import { useQuery } from '@tanstack/react-query';

const UserForm = () => {
    const { data: profileData } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile,
    });

    console.log(profileData);
    
    return <div>UserForm</div>;
};

export default UserForm;
