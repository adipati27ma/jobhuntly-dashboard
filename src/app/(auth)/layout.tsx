import { Epilogue } from 'next/font/google';
import '../globals.css';
import { Header, SideBar } from '@/components/layouts';

const epilogue = Epilogue({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main className="border-t">{children}</main>
      </body>
    </html>
  );
}
