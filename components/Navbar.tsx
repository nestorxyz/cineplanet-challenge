'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import {
  Clapperboard,
  LogIn,
  LogOut,
  ShoppingBasket,
  User as UserIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Películas', href: '/', icon: Clapperboard },
  { label: 'Dulcería', href: '/dulceria', icon: ShoppingBasket },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isGuest, guestName, signOut } = useAuth();
  const userName = user?.displayName || guestName || 'Nestor Mamani';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-blue-950 flex items-center gap-2">
            <span className="bg-blue-950 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">
              C
            </span>
            CINEPLANET
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-bold transition-all relative py-1',
                pathname === item.href
                  ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                  : 'text-muted-foreground hover:text-blue-500',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {user || isGuest ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span>Hola, {userName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-bold text-muted-foreground hover:text-blue-500 hover:bg-transparent p-0 flex items-center gap-1"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full bg-blue-500 hover:bg-blue-600 font-bold px-6"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
