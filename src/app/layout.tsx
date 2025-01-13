import type { Metadata } from 'next';
import { Roboto } from 'next/font/google'

import './globals.css';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer/Footer';
import TanstackProvider from '@/providers/TanstackProvider';
import ClientSideToastContainer from '@/providers/ToashProvider';

const roboto = Roboto({
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body  className={cn('min-h-screen bg-background font-Roboto antialiased', roboto.variable)}>
                <TanstackProvider>
                <ClientSideToastContainer />
                    {children}
                    <Footer />
                </TanstackProvider>
            </body>
        </html>
    );
}
