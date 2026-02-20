'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { RootState } from '@/lib/store/rootReducer';
import { clearCart } from '@/lib/store/slices/cartSlice';
import type { CartItem } from '@/lib/store/slices/cartSlice';
import { processPayment } from '@/app/actions/payment';
import { mockCompleteTransaction } from '@/lib/mocks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Lock,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Smartphone,
  CreditCard as CardIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PagoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isGuest, guestName, loading: authLoading } = useAuth();
  const cart = useSelector((state: RootState) => state.cart);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'YAPE'>('CARD');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    dni: '',
    yapePhone: '',
    otp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push('/login');
    }
  }, [user, isGuest, authLoading, router]);

  const [hasPrefilled, setHasPrefilled] = useState(false);
  if (!authLoading && (user || isGuest) && !hasPrefilled) {
    setHasPrefilled(true);
    setFormData((prev) => ({
      ...prev,
      email: user?.email ?? prev.email,
      name: (user?.displayName || guestName) ?? prev.name,
    }));
  }

  if (authLoading || (!user && !isGuest)) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim()))
      newErrors.email = 'Correo electrónico inválido';
    if (!formData.name.trim()) newErrors.name = 'Requerido';
    if (paymentMethod === 'CARD') {
      if (!formData.cardNumber.match(/^\d{16}$/))
        newErrors.cardNumber = 'Deben ser 16 dígitos';
      if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/))
        newErrors.expiry = 'Formato MM/YY';
      if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = '3 o 4 dígitos';
    } else {
      if (!formData.yapePhone.match(/^9\d{8}$/))
        newErrors.yapePhone = 'Celular inválido (9 dígitos)';
      if (!formData.otp.match(/^\d{6}$/))
        newErrors.otp = 'Código debe ser de 6 dígitos';
    }
    if (!formData.dni.match(/^\d{8,9}$/)) newErrors.dni = 'DNI/CE inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus('idle');

    const isYape = paymentMethod === 'YAPE';
    let expirationDate = '';
    if (!isYape) {
      const [month, year] = formData.expiry.split('/');
      expirationDate = `20${year}/${month}`;
    }

    const result = await processPayment({
      amount: cart.total,
      description: 'Compra de entradas y dulces en Cineplanet',
      payerName: formData.name,
      payerEmail: formData.email,
      payerPhone: isYape ? formData.yapePhone : '999999999',
      payerDni: formData.dni,
      paymentMethod: isYape ? 'YAPE' : 'VISA',
      otp: formData.otp,
      contactPhone: formData.yapePhone,
      creditCard: !isYape
        ? {
            number: formData.cardNumber,
            securityCode: formData.cvv,
            expirationDate,
            name: formData.name,
          }
        : undefined,
    });

    setLoading(false);
    if (
      result.success &&
      result.data?.transactionResponse?.responseCode === 'APPROVED'
    ) {
      const txResponse = result.data.transactionResponse as {
        transactionId?: string;
        operationDate?: string | number;
      };
      await mockCompleteTransaction({
        email: formData.email,
        names: formData.name,
        dni: formData.dni,
        operationDate: txResponse.operationDate ?? new Date().getTime(),
        transactionId: txResponse.transactionId ?? `mock-${Date.now()}`,
      });
      setStatus('success');
      dispatch(clearCart());
    } else {
      setStatus('error');
      setErrorMessage(
        result.data?.transactionResponse?.paymentNetworkResponseErrorMessage ||
          result.error ||
          'La transacción fue rechazada',
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="container mx-auto min-h-[70vh] flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="h-24 w-24 text-green-500 animate-bounce" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">¡Pago Exitoso!</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Tu reserva ha sido confirmada. Hemos enviado los detalles a tu
            correo.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/')}
            className="rounded-full px-8"
          >
            Volver al Inicio
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto px-4 md:px-0">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-8 hover:bg-zinc-100 rounded-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Dulcería
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Payment Form */}
        <div className="space-y-8">
          <section>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Finalizar Pago
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Selecciona tu método de pago preferido.
            </p>
          </section>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setPaymentMethod('CARD')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                paymentMethod === 'CARD'
                  ? 'border-blue-600 bg-blue-50/50'
                  : 'border-zinc-100 hover:border-zinc-200'
              }`}
            >
              <CardIcon
                className={`h-6 w-6 ${paymentMethod === 'CARD' ? 'text-blue-600' : 'text-zinc-400'}`}
              />
              <span
                className={`text-sm font-bold ${paymentMethod === 'CARD' ? 'text-blue-900' : 'text-zinc-500'}`}
              >
                Tarjeta
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('YAPE')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                paymentMethod === 'YAPE'
                  ? 'border-[#742284] bg-[#742284]/5'
                  : 'border-zinc-100 hover:border-zinc-200'
              }`}
            >
              <Smartphone
                className={`h-6 w-6 ${paymentMethod === 'YAPE' ? 'text-[#742284]' : 'text-zinc-400'}`}
              />
              <span
                className={`text-sm font-bold ${paymentMethod === 'YAPE' ? 'text-[#742284]' : 'text-zinc-500'}`}
              >
                Yape
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className={errors.email ? 'border-red-500' : ''}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="NOMBRE APELLIDO"
                  className={errors.name ? 'border-red-500' : ''}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value.toUpperCase(),
                    })
                  }
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {paymentMethod === 'CARD' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <div className="relative">
                      <CardIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        maxLength={16}
                        className={
                          errors.cardNumber ? 'border-red-500 pl-10' : 'pl-10'
                        }
                        value={formData.cardNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cardNumber: e.target.value.replace(/\D/g, ''),
                          })
                        }
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-xs text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Vencimiento</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiry ? 'border-red-500' : ''}
                        value={formData.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2)
                            val = val.substring(0, 2) + '/' + val.substring(2);
                          setFormData({ ...formData, expiry: val });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        type="password"
                        className={errors.cvv ? 'border-red-500' : ''}
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cvv: e.target.value.replace(/\D/g, ''),
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="yapePhone">Número de Celular (Yape)</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input
                        id="yapePhone"
                        placeholder="900 000 000"
                        maxLength={9}
                        className={
                          errors.yapePhone ? 'border-red-500 pl-10' : 'pl-10'
                        }
                        value={formData.yapePhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            yapePhone: e.target.value.replace(/\D/g, ''),
                          })
                        }
                      />
                    </div>
                    {errors.yapePhone && (
                      <p className="text-xs text-red-500">{errors.yapePhone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Código de Aprobación</Label>
                    <Input
                      id="otp"
                      placeholder="6 dígitos"
                      maxLength={6}
                      className={errors.otp ? 'border-red-500' : ''}
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          otp: e.target.value.replace(/\D/g, ''),
                        })
                      }
                    />
                    <p className="text-[10px] text-zinc-500">
                      Obtén este código en tu app Yape: Menu - Códigos de
                      aprobación
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="dni">Documento de Identidad (DNI/CE)</Label>
                <Input
                  id="dni"
                  placeholder="Número de documento"
                  maxLength={9}
                  className={errors.dni ? 'border-red-500' : ''}
                  value={formData.dni}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dni: e.target.value.replace(/\D/g, ''),
                    })
                  }
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-600 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <Button
              className="w-full h-14 text-lg font-bold rounded-xl shadow-xl hover:shadow-blue-500/30 transition-all"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />{' '}
                  Procesando...
                </>
              ) : (
                `Pagar S/ ${cart.total.toFixed(2)}`
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary & Security */}
        <div className="space-y-8">
          <Card className="bg-zinc-50 border-none shadow-inner">
            <CardHeader>
              <CardTitle className="text-xl">Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.items.map((item: CartItem) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.type === 'candy'
                      ? `${item.quantity}x ${item.name}`
                      : `${item.quantity}x Entrada - ${item.title}`}
                  </span>
                  <span className="font-medium">
                    S/{' '}
                    {(
                      (item.type === 'candy' ? item.price : item.unitPrice) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-4 border-t border-zinc-200 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">S/ {cart.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <div className="flex items-center gap-3 text-blue-800">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <span className="font-bold">Pago 100% Seguro</span>
            </div>
            <p className="text-blue-700/80 text-sm leading-relaxed">
              Tus datos están protegidos por encriptación de nivel bancario a
              través de PayU Latam.
            </p>
            <div className="flex items-center gap-2 text-blue-600/60 font-mono text-xs">
              <Lock className="h-3 w-3" />
              <span>SSL 256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
