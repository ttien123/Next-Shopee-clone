import { Suspense } from 'react';
import HistoryPurchase from './HistoryPurchase';
import envConfig from '@/config';
import { Metadata } from 'next';

  
export async function generateMetadata(): Promise<Metadata> {
    const url = envConfig.NEXT_PUBLIC_URL + `/user/purchase`
  
    return {
      title: 'User Purchase',
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
        <div>
            <Suspense fallback={null}>
                <HistoryPurchase />
            </Suspense>
        </div>
    );
};

export default page;
