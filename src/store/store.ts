import { ExtendedPurchase, Purchase } from '@/types/purchase.type';
import { User } from '@/types/user.type';
import { getProfileFromLS } from '@/utils/storage';
import { create } from 'zustand';


type State = {
    profile: User | null;
    productChoice: Purchase | null;
    extendedPurchases: ExtendedPurchase[];
};

type Actions = {
    setProductChoice: (body: Purchase | null) => void;
    setExtendedPurchases: (body: ExtendedPurchase[]) => void;
    setProfile: (body: User | null) => void;
};

const initialState: State = {
    profile: null,
    productChoice: null,
    extendedPurchases: [],
};

const useGetStore = create<State & Actions>()((set) => ({
    ...initialState,
    setProductChoice: (body) => set((state) => ({ productChoice: (state.productChoice = body) })),
    setProfile: (body) => set((state) => ({ profile: (state.profile = body) })),
    setExtendedPurchases: (body) => set((state) => ({ extendedPurchases: (state.extendedPurchases = body) })),
    reset: () => {
        set(initialState);
    },
}));

if (typeof window !== 'undefined') {
    const savedProfile = getProfileFromLS();
    if (savedProfile) {
        useGetStore.getState().setProfile(savedProfile);
    }
}

export default useGetStore;
