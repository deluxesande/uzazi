import type {Metadata} from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Uzazi',
  description: 'Born from the language of your mothers.',
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
