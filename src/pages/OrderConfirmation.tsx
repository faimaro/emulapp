'use client';

import { useState } from 'react';
import { Store, Truck, Wallet, Building2 } from 'lucide-react';

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'cash' | 'transfer';
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

const OrderConfirmation = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    email: '',
    phone: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
  });

  const orderItems: OrderItem[] = [
    {
      name: 'Nombre del Producto',
      quantity: 1,
      price: 24.99,
    },
  ];

  const deliveryFee = formData.deliveryMethod === 'delivery' ? 2.99 : 0;
  const total =
    orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items: orderItems,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pedido');
      }

      // Handle successful order
      alert('Pedido realizado con éxito');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el pedido');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Confirmación de Pedido</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Información Personal</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ingrese su nombre completo"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ingrese su correo"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Número de Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ingrese su teléfono"
              />
            </div>
          </div>
        </section>

        {/* Delivery Method */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Método de Entrega</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, deliveryMethod: 'pickup' }))
              }
              className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 ${
                formData.deliveryMethod === 'pickup'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <Store className="h-6 w-6" />
              <span className="font-medium">Recoger en Tienda</span>
              <span className="text-sm text-gray-500">Gratis</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, deliveryMethod: 'delivery' }))
              }
              className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 ${
                formData.deliveryMethod === 'delivery'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <Truck className="h-6 w-6" />
              <span className="font-medium">Entrega a Domicilio</span>
              <span className="text-sm text-gray-500">$2.99 adicional</span>
            </button>
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Método de Pago</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, paymentMethod: 'cash' }))
              }
              className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 ${
                formData.paymentMethod === 'cash'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <Wallet className="h-6 w-6" />
              <span className="font-medium">Pago en Efectivo</span>
              <span className="text-sm text-gray-500">
                Pagar contra entrega
              </span>
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, paymentMethod: 'transfer' }))
              }
              className={`p-4 border rounded-lg flex flex-col items-center justify-center space-y-2 ${
                formData.paymentMethod === 'transfer'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              <Building2 className="h-6 w-6" />
              <span className="font-medium">Transferencia Bancaria</span>
              <span className="text-sm text-gray-500">
                Pagar mediante transferencia
              </span>
            </button>
          </div>
        </section>

        {/* Order Summary */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Resumen del Pedido</h2>
          <div className="border rounded-lg p-4 space-y-4">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            ))}
            {formData.deliveryMethod === 'delivery' && (
              <div className="flex justify-between items-center border-t pt-4">
                <p className="text-sm text-gray-500">Costo de envío</p>
                <p className="font-medium">${deliveryFee.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between items-center border-t pt-4">
              <p className="font-semibold">Monto Total:</p>
              <p className="font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Completar Compra
        </button>
      </form>
    </div>
  );
};

export default OrderConfirmation;
