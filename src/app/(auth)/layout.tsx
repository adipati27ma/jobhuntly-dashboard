import { Epilogue } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components';

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
        <Toaster />
      </body>
    </html>
  );
}
