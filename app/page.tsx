'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPremieresRequest } from '@/lib/store/slices/premieresSlice';
import { addTicket } from '@/lib/store/slices/cartSlice';
import { RootState } from '@/lib/store/rootReducer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TICKET_PRICE_PEN } from '@/lib/mocks';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    items: premieres,
    loading,
    error,
  } = useSelector((state: RootState) => state.premieres);

  useEffect(() => {
    dispatch(fetchPremieresRequest());
  }, [dispatch]);

  const handleAddMovieToCart = (premiere: {
    id: string;
    title: string;
    image: string;
  }) => {
    dispatch(
      addTicket({
        premiereId: premiere.id,
        title: premiere.title,
        image: premiere.image,
        unitPrice: TICKET_PRICE_PEN,
      }),
    );
    router.push('/dulceria');
  };

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <section className="w-full relative overflow-hidden bg-blue-900 min-h-[350px] md:min-h-[400px] flex items-center shadow-xl">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/socio_home.png"
            alt="Cineplanet Socio"
            fill
            className="object-cover object-right"
            priority
          />
          {/* Readability Overlay - Black gradient from left to right */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent z-10" />
        </div>

        {/* Centered Content Container */}
        <div className="container relative z-20 mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-block px-4 py-2 bg-red-600 rounded-md font-black italic tracking-tighter text-xl scale-90 -rotate-2 border-2 border-white text-white shadow-lg">
              CINEPLANET{' '}
              <span className="text-sm block -mt-1 font-bold italic">CLUB</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              El Programa de beneficios que premia tu diversión.
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-8 h-12 text-lg font-bold shadow-lg transition-transform hover:scale-105"
              >
                ¡Únete ahora!
              </Button>
              <p className="text-blue-50 font-medium max-w-[200px] text-lg leading-tight">
                Descuentos, puntos, premios y más
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estrenos Section */}
      <section className="container mx-auto px-4 py-12 space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight text-blue-950">
            Estrenos
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Explora los estrenos más esperados y elige tu próxima aventura en el
            cine.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8">
            <Skeleton className="h-[450px] w-full rounded-3xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 4].map((i) => (
                <Skeleton key={i} className="aspect-2/3 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Premiere */}
            {premieres.length > 0 && (
              <div className="relative flex flex-col md:flex-row gap-8 items-center bg-[#F7F7F7] rounded-3xl p-6 md:p-0 overflow-hidden">
                <div className="relative w-full md:w-[350px] aspect-2/3 shrink-0 rounded-2xl md:rounded-l-3xl md:rounded-r-none overflow-hidden group">
                  <Image
                    src={premieres[0].image}
                    alt={premieres[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Estreno
                  </div>
                </div>
                <div className="flex-1 space-y-6 md:pr-12">
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight leading-none">
                      {premieres[0].title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                      {premieres[0].description}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full px-10 h-14 text-lg font-bold bg-blue-500 hover:bg-blue-600 shadow-xl hover:shadow-blue-500/20 transition-all"
                    onClick={() => handleAddMovieToCart(premieres[0])}
                  >
                    Comprar Entradas
                  </Button>
                  <div className="flex gap-2 justify-center md:justify-start pt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${i === 1 ? 'bg-blue-500 w-4' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Movie Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {premieres.slice(1).map((premiere) => (
                <button
                  key={premiere.id}
                  type="button"
                  onClick={() => handleAddMovieToCart(premiere)}
                  className="group space-y-4 text-left w-full"
                >
                  <div className="relative aspect-2/3 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={premiere.image}
                      alt={premiere.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {premiere.id === '6' && ( // Just an example for a badge
                      <div className="absolute top-3 right-3 bg-red-600 text-[10px] text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                        Estreno
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 px-1">
                    <h4 className="font-bold text-lg text-blue-950 line-clamp-1 group-hover:text-blue-700 transition-colors">
                      {premiere.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
