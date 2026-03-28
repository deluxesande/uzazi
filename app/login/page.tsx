'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-warmWhite px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-10 border border-rosePink/20">
        <h1 className="text-3xl font-bold text-deepPlum mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-deepPlum/70 mb-8 text-center">
          {isLogin ? 'Sign in to continue to Uzazi' : 'Register to get started'}
        </p>

        {error && (
          <div className="mb-6 p-3 bg-rosePink/10 text-deepPlum border border-rosePink/30 rounded text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border-2 border-deepPlum/10 hover:border-deepPlum/30 text-deepPlum font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-70 mb-6"
        >
          Continue with Google
        </button>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-deepPlum/10"></div>
          <span className="flex-shrink-0 mx-4 text-deepPlum/50 text-xs font-bold uppercase tracking-wider">
            Or use email
          </span>
          <div className="flex-grow border-t border-deepPlum/10"></div>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-deepPlum mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-deepPlum/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintGreen focus:border-transparent bg-warmWhite/50 text-deepPlum"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-deepPlum mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-deepPlum/20 rounded-md focus:outline-none focus:ring-2 focus:ring-mintGreen focus:border-transparent bg-warmWhite/50 text-deepPlum"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mintGreen hover:opacity-90 text-white font-semibold py-3 px-4 rounded-md transition-opacity disabled:opacity-70 mt-2"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-mintGreen hover:text-mintGreen/80 font-semibold transition-colors"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
