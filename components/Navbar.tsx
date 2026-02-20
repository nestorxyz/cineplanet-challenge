'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import {
  Clapperboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingBasket,
  User as UserIcon,
  X,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = user?.displayName || guestName || 'Nestor Mamani';
  const firstName = userName.split(' ')[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container px-4 md:px-0 mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-blue-950 flex items-center gap-2">
            <span className="bg-blue-950 text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-lg">
              C
            </span>
            CINEPLANET
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        <div className="flex items-center gap-2 md:gap-6">
          {user || isGuest ? (
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Hola, {userName}</span>
                <span className="sm:hidden text-xs">Hola, {firstName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs md:text-sm font-bold text-muted-foreground hover:text-blue-500 hover:bg-transparent p-0 flex items-center gap-1"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden xs:inline">Salir</span>
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden xs:block">
              <Button
                size="sm"
                className="rounded-full bg-blue-500 hover:bg-blue-600 font-bold px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm"
              >
                <LogIn className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                Iniciar Sesión
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b absolute top-16 left-0 w-full animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'text-lg font-bold flex items-center gap-3 p-2 rounded-lg transition-colors',
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-500'
                    : 'text-muted-foreground hover:bg-gray-50',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            {!user && !isGuest && (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold flex items-center gap-3 p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
