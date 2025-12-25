import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { formatNaira } from "../utils/formatCurrency";

export default function Checkout() {
  const { items, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-background-light text-text-light min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-4">Please login to checkout</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:opacity-90"
            >
              Go to Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-background-light text-text-light min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Create order
      const order = await orderService.createOrder({
        userId: user.id,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      // Build callback URL with telegramChatId if available
      // Paystack will append ?reference=... to this URL
      let callbackUrl = `${window.location.origin}/payment/callback`;
      if (user.telegramChatId) {
        callbackUrl += `?telegramChatId=${encodeURIComponent(user.telegramChatId)}`;
      }

      // Initialize payment
      const payment = await paymentService.initializePayment({
        orderId: order.id,
        email: email || `${user.phone}@example.com`,
        callbackUrl: callbackUrl,
      });

      // Redirect to Paystack
      if (payment.data?.authorizationUrl) {
        window.location.href = payment.data.authorizationUrl;
      } else {
        throw new Error("Failed to initialize payment");
      }
    } catch (err: any) {
      setError(err.message || "Checkout failed");
      setLoading(false);
    }
  };

  console.log(items);

  return (
    <div className="bg-background-light text-text-light min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4  pb-4"
                  >
                    <img
                      src={item.product.image || ""}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-medium hover:underline ">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">
                        {item.product.fit} • {item.product.color}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2 border border-gray-300 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition"
                            type="button"
                          >
                            <span className="material-icons-outlined text-sm">
                              remove
                            </span>
                          </button>
                          <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition"
                            type="button"
                          >
                            <span className="material-icons-outlined text-sm">
                              add
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="font-bold">
                        {formatNaira(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                        type="button"
                      >
                        <span className="material-icons-outlined text-sm">
                          delete_outline
                        </span>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Payment Information</h2>
              <form onSubmit={handleCheckout}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email (for payment receipt)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-bold py-4 rounded-full hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : `Pay ${formatNaira(getTotalPrice())}`}
                </button>
              </form>
            </div>
          </div>

          {/* side bar order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Total</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatNaira(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatNaira(getTotalPrice())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
