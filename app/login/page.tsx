'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { User as UserIcon, Loader2 } from 'lucide-react';

function LoginSkeleton() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-zinc-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transform rotate-12">
            <span className="text-white font-black text-4xl">C</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tighter text-white">
              CINEPLANET
            </h1>
            <p className="text-zinc-500 font-medium">
              Vive la emoción del cine
            </p>
          </div>
        </div>

        {/* Login Card - Skeleton */}
        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
          <div className="space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-40 bg-zinc-700/50" />
              <Skeleton className="h-4 w-64 bg-zinc-700/50" />
            </div>

            {/* Google button skeleton */}
            <Skeleton className="h-14 w-full rounded-2xl bg-zinc-700/50" />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-zinc-900/40 px-4 text-zinc-600 font-bold">
                  O también
                </span>
              </div>
            </div>

            {/* Input skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 bg-zinc-700/50" />
              <Skeleton className="h-14 w-full rounded-xl bg-zinc-700/50" />
            </div>

            {/* Loader inside card */}
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-center text-zinc-600 text-xs font-medium">
          Al continuar, aceptas nuestros términos y condiciones.
          <br />© 2026 Cineplanet Internacional.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const {
    signInWithGoogle,
    signInAsGuest,
    user,
    isGuest,
    loading: authLoading,
  } = useAuth();
  const router = useRouter();
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dulceria
  useEffect(() => {
    if (!authLoading && (user || isGuest)) {
      router.push('/dulceria');
    }
  }, [user, isGuest, authLoading, router]);

  if (authLoading || user || isGuest) {
    return <LoginSkeleton />;
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
    router.push('/dulceria');
  };

  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    signInAsGuest(guestName);
    router.push('/dulceria');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-zinc-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[480px]">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transform rotate-12 transition-transform hover:rotate-0 duration-500">
            <span className="text-white font-black text-4xl">C</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tighter text-white">
              CINEPLANET
            </h1>
            <p className="text-zinc-500 font-medium">
              Vive la emoción del cine
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Iniciar Sesión
              </h2>
              <p className="text-zinc-400 text-sm">
                Elige cómo quieres continuar tu experiencia
              </p>
            </div>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-14 bg-white text-zinc-950 hover:bg-zinc-100 border-none rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="-3 0 262 262"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
              )}
              Continuar con Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#121214] px-4 text-zinc-600 font-bold">
                  O también
                </span>
              </div>
            </div>

            {/* Visitor Login */}
            <form onSubmit={handleGuestLogin} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1"
                >
                  Tu Nombre
                </label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 transition-colors group-focus-within:text-blue-500" />
                  <Input
                    id="name"
                    placeholder="Escribe tu nombre..."
                    className="bg-zinc-950/50 border-zinc-800/50 pl-12 h-14 text-white placeholder:text-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition-all text-lg"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl transition-all hover:shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95"
              >
                Compra como visitante
              </Button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-center text-zinc-600 text-xs font-medium">
          Al continuar, aceptas nuestros términos y condiciones.
          <br />© 2026 Cineplanet Internacional.
        </p>
      </div>
    </div>
  );
}
