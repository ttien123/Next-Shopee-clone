import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer/Footer';
import TanstackProvider from '@/providers/TanstackProvider';
import ClientSideToastContainer from '@/providers/ToastProvider';
import NextTopLoader from 'nextjs-toploader'

const roboto = Roboto({
    display: 'swap',
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: {
        template: '%s | ShopeeClone',
        default: 'Shopee Clone | Tiến Nguyễn',
    },
    description: 'Mua sắm hàng ngàn sản phẩm vô cùng dễ dàng & nhiều ưu đãi sốc với app Shopee Shopee Đảm Bảo Nhận Hàng, hoặc được Hoàn Lại Tiền Giao Hàng Miễn Phí XEM NGAY.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn('min-h-screen bg-background font-Roboto antialiased', roboto.variable)}>
                <NextTopLoader showSpinner={false} color="#e5e7eb" />
                <TanstackProvider>
                    <ClientSideToastContainer />
                    {children}
                    <Footer />
                </TanstackProvider>
            </body>
        </html>
    );
}
