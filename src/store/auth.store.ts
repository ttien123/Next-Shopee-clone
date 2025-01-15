
import { User } from '@/types/user.type';
import { create } from 'zustand';

interface profileInterface {
    profile: User | null;
    setProfile: (body: User | null) => void;
}

const useSetProfile = create<profileInterface>()((set) => ({
    profile: null,
    setProfile: (body) => set((state) => ({ profile: (state.profile = body) })),
}));

export default useSetProfile;
