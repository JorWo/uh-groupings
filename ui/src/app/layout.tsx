import './globals.css';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Footer from '@/components/layout/footer/Footer';
import Navbar from '@/components/layout/navbar/Navbar';

export const sourceSans3 = Source_Sans_3({
    subsets: ['latin'],
    weight: ['400', '600', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-source-sans-3'
});

export const metadata: Metadata = {
    title: 'UH Groupings'
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <head>
            <ColorSchemeScript />
        </head>
        <body>
            <MantineProvider>
                <Navbar />
                {children}
                <Footer />
            </MantineProvider>
        </body>
      </html>
    );
}
