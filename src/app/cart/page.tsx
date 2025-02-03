import { Metadata } from 'next';
import PurchaseList from './components/PurchaseList/PurchaseList';
import envConfig from '@/config';

  
export async function generateMetadata(): Promise<Metadata> {
    const url = envConfig.NEXT_PUBLIC_URL + `/cart`
  
    return {
      title: 'Cart',
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
            <PurchaseList />
        </div>
    );
};

export default page;
