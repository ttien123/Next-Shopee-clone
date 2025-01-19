
import { User } from '@/types/user.type';
import { getProfileFromLS } from '@/utils/storage';
import { create } from 'zustand';

interface profileInterface {
    profile: User | null;
    setProfile: (body: User | null) => void;
}

const useSetProfile = create<profileInterface>()((set) => ({
    profile: null,
    setProfile: (body) => set((state) => ({ profile: (state.profile = body) })),
}));

if (typeof window !== 'undefined') {
    const savedProfile = getProfileFromLS();
    if (savedProfile) {
        useSetProfile.getState().setProfile(savedProfile);
    }
}

export default useSetProfile;
