'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { RootState } from '@/lib/store/rootReducer';
import { fetchCandyStoreRequest } from '@/lib/store/slices/candystoreSlice';
import { addItem, removeItem } from '@/lib/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBasket,
} from 'lucide-react';
import Image from 'next/image';

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
    return null;
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product List */}
        <div className="flex-1 space-y-8">
          <section>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Dulcería</h1>
            <p className="text-muted-foreground text-lg italic">
              ¡Acompaña tu película con los mejores combos!
            </p>
          </section>

          {error && (
            <div className="p-4 bg-red-50 text-red-500 rounded-lg">{error}</div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden border-none shadow-md"
                  >
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))
              : products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-zinc-50/50 flex flex-col"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1 gap-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-primary">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-black text-blue-600">
                          S/ {product.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() => dispatch(addItem(product))}
                          size="sm"
                          className="rounded-full px-4 shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Agregar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <aside className="w-full lg:w-96">
          <Card className="sticky top-28 border-2 border-zinc-100 shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-primary p-6 text-white flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              <h2 className="text-xl font-bold">Tu Pedido</h2>
            </div>
            <CardContent className="p-0">
              <div className="max-h-[50vh] overflow-y-auto px-6 py-4 space-y-4">
                {cart.items.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-20 w-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBasket className="h-10 w-10 text-zinc-300" />
                    </div>
                    <p className="text-muted-foreground italic">
                      El carrito está vacío
                    </p>
                  </div>
                ) : (
                  cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-2 border-b border-zinc-100 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-zinc-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-blue-600 font-semibold">
                          S/ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 bg-zinc-100 rounded-full px-3 py-1">
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="hover:text-red-600 transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="h-4 w-4" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </button>
                        <span className="font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(addItem(item))}
                          className="hover:text-blue-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-zinc-50 border-t border-zinc-100 space-y-6">
                <div className="flex items-center justify-between text-xl font-black">
                  <span>Total</span>
                  <span className="text-primary">
                    S/ {cart.total.toFixed(2)}
                  </span>
                </div>
                <Button
                  disabled={cart.items.length === 0}
                  className="w-full h-14 text-lg font-bold rounded-xl shadow-xl hover:shadow-blue-500/30 transition-all group"
                  onClick={() => router.push('/pago')}
                >
                  Continuar al Pago
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
