import { Suspense } from 'react';
import HistoryPurchase from './HistoryPurchase';

const page = () => {
    return (
        <div>
            <Suspense fallback={null}>
                <HistoryPurchase />
            </Suspense>
        </div>
    );
};

export default page;
