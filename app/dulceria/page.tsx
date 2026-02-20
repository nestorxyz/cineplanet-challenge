'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { RootState } from '@/lib/store/rootReducer';
import { fetchCandyStoreRequest } from '@/lib/store/slices/candystoreSlice';
import { addItem, addTicket, removeItem } from '@/lib/store/slices/cartSlice';
import type { CartItem } from '@/lib/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Minus, Trash2, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';

const DULCERIA_SKELETON = (
  <div className="container py-12 mx-auto px-4 md:px-0 min-h-[calc(100vh-4rem)]">
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1 space-y-8">
        <section>
          <Skeleton className="h-10 w-48 mb-2" />
          <div className="h-1 w-20 bg-zinc-200 rounded mb-6" />
        </section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden border-none shadow-sm animate-pulse"
            >
              <Skeleton className="h-56 w-full" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <aside className="w-full lg:w-[400px]">
        <div className="sticky top-28 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden border border-zinc-100 p-8">
          <Skeleton className="h-9 w-32 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
          <div className="mt-8 p-6 bg-zinc-100 rounded-2xl space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </aside>
    </div>
  </div>
);

export default function DulceriaPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isGuest, loading: authLoading } = useAuth();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.candystore);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push('/login');
    }
  }, [user, isGuest, authLoading, router]);

  useEffect(() => {
    dispatch(fetchCandyStoreRequest());
  }, [dispatch]);

  if (authLoading || (!user && !isGuest)) {
    return DULCERIA_SKELETON;
  }

  return (
    <div className="container py-12 mx-auto px-4 md:px-0">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product List */}
        <div className="flex-1 space-y-8">
          <section>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-zinc-900 uppercase">
              Combos
            </h1>
            <div className="h-1 w-20 bg-primary mb-6" />
          </section>

          {error && (
            <div className="p-4 bg-red-50 text-red-500 rounded-lg">{error}</div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden border-none shadow-sm animate-pulse"
                  >
                    <Skeleton className="h-56 w-full" />
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))
              : products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden pt-0 group hover:shadow-2xl transition-all duration-500 border-none bg-white flex flex-col rounded-3xl"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="flex flex-col flex-1 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                          Detalle: {product.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through opacity-50">
                            S/ {(product.price * 1.2).toFixed(2)}
                          </span>
                          <span className="text-xl font-black text-zinc-900">
                            S/ {product.price.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          onClick={() => dispatch(addItem(product))}
                          size="sm"
                          className="rounded-xl px-4 bg-zinc-100 text-zinc-900 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95 text-xs font-bold"
                        >
                          Agregar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        {/* Cart Sidebar - "RESUMEN" */}
        <aside className="w-full lg:w-[400px]">
          <div className="sticky top-28 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden border border-zinc-100">
            <div className="p-8 pb-4">
              <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter italic">
                Resumen
              </h2>
            </div>

            <CardContent className="p-0">
              <div className="px-8 space-y-8">
                {/* Items Section */}
                <div className="space-y-6">
                  <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Entradas Section */}
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                        Entradas
                      </span>

                      {cart.items.filter((i) => i.type === 'ticket').length ===
                      0 ? (
                        <div className="p-6 text-center bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col gap-3">
                          <p className="text-zinc-500 text-xs font-medium italic leading-relaxed">
                            ¡Aún no tienes entradas! Ve a Ver Películas para
                            elegir tu función favorita
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[10px] font-black uppercase tracking-widest h-8 rounded-xl border-zinc-200 hover:bg-zinc-100"
                            onClick={() => router.push('/')}
                          >
                            Ver Películas
                          </Button>
                        </div>
                      ) : (
                        cart.items
                          .filter((i) => i.type === 'ticket')
                          .map((item: CartItem) => (
                            <div
                              key={item.id}
                              className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300 items-center"
                            >
                              <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-zinc-100 shadow-sm">
                                <Image
                                  src={
                                    item.type === 'ticket'
                                      ? item.image ||
                                        'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300'
                                      : ''
                                  }
                                  alt={item.type === 'ticket' ? item.title : ''}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-[11px] text-zinc-900 uppercase tracking-tight line-clamp-1">
                                  {item.type === 'ticket' ? item.title : ''}
                                </h4>
                                <p className="text-[10px] font-bold text-zinc-500">
                                  S/{' '}
                                  {item.type === 'ticket'
                                    ? item.unitPrice.toFixed(2)
                                    : ''}
                                  <span className="ml-1 opacity-60 font-normal text-[8px]">
                                    (Entrada)
                                  </span>
                                </p>
                              </div>

                              <div className="flex items-center bg-zinc-50 rounded-xl px-2 py-1 gap-2 border border-zinc-100">
                                <button
                                  onClick={() => dispatch(removeItem(item.id))}
                                  className="text-zinc-400 cursor-pointer hover:text-red-500 transition-colors p-1"
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 className="h-3 w-3" />
                                  ) : (
                                    <Minus className="h-3 w-3" />
                                  )}
                                </button>
                                <span className="text-[11px] font-black text-zinc-900 min-w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    item.type === 'ticket' &&
                                    dispatch(
                                      addTicket({
                                        premiereId: item.premiereId,
                                        title: item.title,
                                        image: item.image,
                                        unitPrice: item.unitPrice,
                                      }),
                                    )
                                  }
                                  className="text-zinc-400 cursor-pointer hover:text-primary transition-colors p-1"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>

                    {/* Food section */}
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                        Alimentos y Bebidas
                      </span>

                      {cart.items.filter((i) => i.type === 'candy').length ===
                      0 ? (
                        <div className="p-6 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-100">
                          <p className="text-zinc-400 text-[10px] font-medium italic">
                            Agrega productos a tu pedido
                          </p>
                        </div>
                      ) : (
                        cart.items
                          .filter((i) => i.type === 'candy')
                          .map((item: CartItem) => (
                            <div
                              key={item.id}
                              className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300 items-center"
                            >
                              <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-zinc-100 shadow-sm">
                                <Image
                                  src={item.type === 'candy' ? item.image : ''}
                                  alt={item.type === 'candy' ? item.name : ''}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-[11px] text-zinc-900 uppercase tracking-tight line-clamp-1">
                                  {item.type === 'candy' ? `${item.name}` : ''}
                                </h4>
                                <p className="text-[10px] font-bold text-zinc-500">
                                  S/{' '}
                                  {item.type === 'candy'
                                    ? item.price.toFixed(2)
                                    : ''}
                                </p>
                              </div>

                              <div className="flex items-center bg-zinc-50 rounded-xl px-2 py-1 gap-2 border border-zinc-100">
                                <button
                                  onClick={() => dispatch(removeItem(item.id))}
                                  className="text-zinc-400 cursor-pointer hover:text-red-500 transition-colors p-1"
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 className="h-3 w-3" />
                                  ) : (
                                    <Minus className="h-3 w-3" />
                                  )}
                                </button>
                                <span className="text-[11px] font-black text-zinc-900 min-w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    item.type === 'candy' &&
                                    dispatch(addItem(item))
                                  }
                                  className="text-zinc-400 cursor-pointer hover:text-primary transition-colors p-1"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={cart.items.length === 0}
                onClick={() => router.push('/pago')}
                className="w-full mt-8 p-8 cursor-pointer bg-zinc-950 text-white space-y-6 hover:bg-zinc-900 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBasket className="h-5 w-5 text-zinc-400 group-hover:text-primary transition-colors" />
                    <span className="text-xl font-black">
                      S/{' '}
                      {(cart.total + (cart.items.length > 0 ? 1 : 0)).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                  <div className="h-12 px-8 text-sm font-black uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                    Continuar
                  </div>
                </div>
              </button>
            </CardContent>
          </div>
        </aside>
      </div>
    </div>
  );
}
