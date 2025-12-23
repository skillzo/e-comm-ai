import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import { useAuth } from "../contexts/AuthContext";
import { orderService } from "../services/orderService";
import type { Order, OrderStatus } from "../types";
import { formatNaira } from "../utils/formatCurrency";

const filterOptions = ["All Orders", "Open Orders", "Cancelled", "Returns"];
const timeRanges = ["Last 30 Days", "Past 3 Months", "2023", "2022"];

const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Order Placed",
    payment_pending: "Payment Pending",
    paid: "Paid",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return statusMap[status] || status;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getTrackingSteps = (
  status: OrderStatus,
  createdAt: string,
  updatedAt?: string
): Array<{
  label: string;
  date: string;
  icon: string;
  completed: boolean;
  active?: boolean;
}> => {
  const orderDate = formatDate(createdAt);
  const updateDate = updatedAt ? formatDate(updatedAt) : orderDate;

  const steps = [
    {
      label: "Order Placed",
      date: orderDate,
      icon: "shopping_bag",
      completed: true,
      active: false,
    },
    {
      label: "Payment",
      date: orderDate,
      icon: "payment",
      completed: false,
      active: false,
    },
    {
      label: "Processing",
      date: updateDate,
      icon: "inventory",
      completed: false,
      active: false,
    },
    {
      label: "Shipped",
      date: updateDate,
      icon: "local_shipping",
      completed: false,
      active: false,
    },
    {
      label: "Delivered",
      date: updateDate,
      icon: "check_circle",
      completed: false,
      active: false,
    },
  ];

  const statusMap: Record<OrderStatus, number> = {
    pending: 0,
    payment_pending: 1,
    paid: 1,
    processing: 2,
    shipped: 3,
    delivered: 4,
    cancelled: 0,
  };

  const currentStep = statusMap[status] || 0;

  if (status === "cancelled") {
    return steps.map((step) => ({
      ...step,
      completed: false,
      active: false,
    }));
  }

  return steps.map((step, index) => ({
    ...step,
    completed: index <= currentStep,
    active: index === currentStep,
  }));
};

export default function OrderHistory() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("All Orders");
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 30 Days");
  const [currentPage, setCurrentPage] = useState(1);

  console.log("user", user);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getUserOrders(user.id);

        console.log("orders data", data);
        setOrders(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated]);

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === "All Orders") return true;
    if (selectedFilter === "Open Orders") {
      return !["delivered", "cancelled"].includes(order.status);
    }
    if (selectedFilter === "Cancelled") {
      return order.status === "cancelled";
    }
    return true;
  });

  if (loading) {
    return (
      <div className="bg-background-light text-[#0d131b] min-h-screen flex flex-col font-display">
        <Header />
        <main className="layout-container flex h-full grow flex-col pb-12">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-600">Loading orders...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light text-[#0d131b] min-h-screen flex flex-col font-display">
        <Header />
        <main className="layout-container flex h-full grow flex-col pb-12">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
            <div className="flex justify-center items-center py-20">
              <p className="text-red-600">Error: {error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background-light text-[#0d131b] min-h-screen flex flex-col font-display">
      <Header />
      <main className="layout-container flex h-full grow flex-col pb-12">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-6">
            <div className="flex flex-wrap gap-2 px-4">
              <Link
                className="text-[#4c6c9a] hover:text-black text-sm font-medium leading-normal transition-colors"
                to="/"
              >
                Home
              </Link>
              <span className="text-[#4c6c9a] text-sm font-medium leading-normal">
                /
              </span>
              <Link
                className="text-[#4c6c9a] hover:text-black text-sm font-medium leading-normal transition-colors"
                to="/"
              >
                Account
              </Link>
              <span className="text-[#4c6c9a] text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-[#0d131b] text-sm font-medium leading-normal">
                Order History
              </span>
            </div>

            <div className="flex flex-col gap-6 px-4">
              <div className="flex flex-wrap justify-between gap-4 items-end">
                <div className="flex min-w-72 flex-col gap-2">
                  <h1 className="text-[#0d131b] text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
                    Order History
                  </h1>
                  <p className="text-[#4c6c9a] text-base font-normal leading-normal">
                    Track, return, or buy things again.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="h-10 pl-4 pr-10 rounded-lg border border-slate-200 bg-white text-sm text-[#0d131b] focus:border-black focus:ring-black"
                    >
                      {timeRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                      selectedFilter === filter
                        ? "bg-[#0d131b] text-white"
                        : "bg-white border border-slate-200 hover:bg-slate-50 text-[#0d131b]"
                    }`}
                  >
                    <span className="text-sm font-medium leading-normal">
                      {filter}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 px-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No orders found</p>
                  <Link
                    to="/"
                    className="text-black font-medium hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const orderItems = order.orderItems || [];
                  const trackingSteps = getTrackingSteps(
                    order.status,
                    order.createdAt,
                    order.updatedAt
                  );

                  const orderCardItems = orderItems.map((item) => ({
                    image: item.product?.image || "",
                    name: item.product?.name || "Product",
                    details: `${item.product?.color || ""} • Size: ${
                      item.product?.fit || "N/A"
                    }`,
                    price: formatNaira(item.price * item.quantity),
                    status: getStatusLabel(order.status),
                    statusIcon:
                      order.status === "delivered" ? "check_circle" : undefined,
                    actions: [
                      {
                        label: "Buy Again",
                        onClick: () => {
                          // TODO: Implement buy again functionality
                          console.log("Buy again", item.productId);
                        },
                        primary: false,
                      },
                      ...(order.status === "delivered"
                        ? [
                            {
                              label: "Return",
                              onClick: () => {
                                // TODO: Implement return functionality
                                console.log("Return item", item.id);
                              },
                              primary: false,
                            },
                          ]
                        : []),
                    ],
                  }));

                  return (
                    <OrderCard
                      key={order.id}
                      orderNumber={order.id.slice(0, 8).toUpperCase()}
                      orderDate={formatDate(order.createdAt)}
                      total={formatNaira(order.totalAmount)}
                      shipTo={order.phone}
                      items={orderCardItems}
                      trackingSteps={trackingSteps}
                      collapsed={false}
                    />
                  );
                })
              )}
            </div>

            {filteredOrders.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 text-[#4c6c9a] hover:text-[#0d131b] disabled:opacity-50 font-medium"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`size-8 rounded-lg font-medium flex items-center justify-center text-sm transition-colors ${
                        currentPage === page
                          ? "bg-black text-white font-bold"
                          : "hover:bg-slate-100 text-[#0d131b]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="flex items-center gap-1 text-[#4c6c9a] hover:text-[#0d131b] font-medium"
                >
                  Next
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
