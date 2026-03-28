import type {Metadata} from 'next';
import { Nunito } from 'next/font/google';
import './globals.css'; // Global styles
import { AuthProvider } from '@/context/AuthContext';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Uzazi',
  description: 'Web portal for Uzazi',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="bg-warmWhite text-deepPlum font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
