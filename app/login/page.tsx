'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome, User as UserIcon, Loader2 } from 'lucide-react';

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
    return null;
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
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/login-bg.png"
          alt="Cinema Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md bg-zinc-900/80 border-zinc-800 text-white backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-1 pb-8 pt-8">
          <CardTitle className="text-3xl font-bold tracking-tight text-center bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Bienvenido a Cineplanet
          </CardTitle>
          <p className="text-center text-zinc-400 text-sm">
            Disfruta de la mejor experiencia cinematográfica
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            variant="outline"
            className="w-full h-12 bg-white text-zinc-900 hover:bg-zinc-100 border-none relative font-semibold transition-all hover:scale-[1.02]"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Chrome className="mr-2 h-5 w-5 text-red-500" />
            )}
            Continuar con Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900/0 px-2 text-zinc-500 backdrop-blur-md">
                O como invitado
              </span>
            </div>
          </div>

          <form onSubmit={handleGuestLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Nombre
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="name"
                  placeholder="Tu nombre aquí"
                  className="bg-zinc-950/50 border-zinc-800 pl-10 h-11 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Ingresar como Invitado
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
