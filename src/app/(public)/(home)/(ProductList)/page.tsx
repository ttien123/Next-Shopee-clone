import { Suspense } from 'react';
import ListProduct from './components/ListProducts/ListProduct';

const page = () => {
    return (
        <div className="bg-gray-200 py-6">
            <Suspense fallback={null}><ListProduct /></Suspense>
        </div>
    );
};

export default page;
