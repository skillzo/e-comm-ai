import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { paymentService } from "../services/paymentService";
import { useCart } from "../contexts/CartContext";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setStatus("error");
        setMessage("No payment reference found");
        return;
      }

      try {
        const response = await paymentService.verifyPayment(reference);

        if (response.status === "success" && response.data?.status === "paid") {
          setStatus("success");
          setMessage("Payment successful! Your order has been confirmed.");
          clearCart();

          setTimeout(() => {
            navigate("/orders", { replace: true });
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.message || "Payment verification failed");
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Failed to verify payment");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="bg-background-light text-text-light min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {status === "loading" && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Verifying payment...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting to your orders...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-red-500 text-6xl mb-4">✗</div>
              <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={() => navigate("/orders")}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:opacity-90"
              >
                View Orders
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
