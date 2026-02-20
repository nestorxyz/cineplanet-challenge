'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPremieresRequest } from '@/lib/store/slices/premieresSlice';
import { RootState } from '@/lib/store/rootReducer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const dispatch = useDispatch();
  const {
    items: premieres,
    loading,
    error,
  } = useSelector((state: RootState) => state.premieres);

  useEffect(() => {
    dispatch(fetchPremieresRequest());
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Estrenos
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explora los estrenos más esperados y elige tu próxima aventura en el
          cine.
        </p>
      </section>

      <div className="grid gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <Skeleton className="h-[400px] w-full md:w-[300px]" />
                  <div className="flex-1 p-6 space-y-4">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          : premieres.map((premiere) => (
              <Card
                key={premiere.id}
                className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-none bg-zinc-50/50"
              >
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <Link
                    href="/login"
                    className="relative h-[400px] w-full md:w-[300px] overflow-hidden shrink-0"
                  >
                    <Image
                      src={premiere.image}
                      alt={premiere.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </Link>
                  <div className="flex-1 p-8 flex flex-col justify-center gap-6">
                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold tracking-tight text-primary">
                        {premiere.title}
                      </h2>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {premiere.description}
                      </p>
                    </div>
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="w-fit rounded-full px-8 font-semibold shadow-md hover:shadow-xl transition-all"
                      >
                        Comprar Entradas
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
