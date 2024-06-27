import type { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import './globals.css';
import { Header, SideBar } from '@/components/layouts';

const epilogue = Epilogue({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobHuntly Dashboard',
  description: 'JobHuntly Dashboard by CNA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main className="border-t">
          <div className="bg-background">
            <div className="flex flex-row">
              <div className="hidden lg:block w-[20%]">
                <SideBar />
              </div>
              <div className="col-span-33 overflow-auto lg:col-span-5 lg:border-l w-[82%]">
                <div className="px-6 py-6 lg:px-8">
                  <Header />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
