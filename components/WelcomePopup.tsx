'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkles } from 'lucide-react';

export function WelcomePopup() {
  const { user, guestName, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const displayName = user?.displayName || guestName;

  useEffect(() => {
    if (!loading && displayName && !hasShown) {
      // Small delay to ensure smooth transition after login redirect
      const timer = setTimeout(() => {
        setOpen(true);
        setHasShown(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, displayName, hasShown]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-sm rounded-3xl bg-zinc-900 border-zinc-800 text-white p-6">
        <DialogHeader className="flex flex-col items-center gap-3 py-2">
          <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-600/20 flex items-center justify-center animate-bounce">
            <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-blue-500" />
          </div>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center">
            ¡Bienvenido/a, {displayName}!
          </DialogTitle>
          <p className="text-zinc-400 text-center text-sm md:text-base">
            Estamos listos para que disfrutes de la mejor experiencia
            cinematográfica.
          </p>
        </DialogHeader>
        <div className="flex justify-center pb-4">
          <button
            onClick={() => setOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-semibold transition-all"
          >
            Comenzar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
