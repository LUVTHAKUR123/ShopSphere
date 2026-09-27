import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { CartItem } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
export default function Cart() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    fetchCart();
  }, [user, authLoading]);

  function fetchCart() {
    api
      .get<CartItem[]>("/cart")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }
  async function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/${id}`, { quantity });

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  }

  async function removeItem(id: number) {
    await api.delete(`/cart/${id}`);
    fetchCart();
  }

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.product?.price || 0) * Number(item.quantity || 0),
    0,
  );

  if (authLoading || (user && loading)) {
    return <p>Loading cart...</p>;
  }
  return (
    <div>
      <h2 className="mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-center py-5 px-3">
          {/* Cart Icon */}
          <div
            className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "100px", height: "100px" }}
          >
            <i
              className="bi bi-cart3 text-primary"
              style={{ fontSize: "45px" }}
            ></i>
          </div>

          {/* Message */}
          <h3 className="fw-bold text-dark mb-3">
            Your Cart is Feeling Lonely!
          </h3>

          <p
            className="text-secondary mx-auto mb-4"
            style={{ maxWidth: "400px" }}
          >
            Looks like you haven't added anything to your cart yet. Explore our
            collection and find something you'll love!
          </p>

          {/* Shopping Button */}
          <Link
            href="/products"
            className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-semibold shadow-sm"
          >
            <i className="bi bi-bag-heart me-2"></i>
            Continue Shopping
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>

          <p className="text-muted small mt-3 mb-0">
            <i className="bi bi-truck me-1"></i>
            Discover amazing products just for you.
          </p>
        </div>
      ) : (
        <>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-2">
                    <img
                      src={
                        item.product?.image_data
                          ? `data:${item.product.image_mime_type || "image/jpeg"};base64,${item.product.image_data}`
                          : item.product?.image_url || "/images/placeholder.png"
                      }
                      width={50}
                      height={50}
                      alt={item.product?.name || "Product"}
                      style={{ objectFit: "contain" }}
                    />

                    {item.product?.name}
                  </td>
                  {/* Price */}

                  {/* Price */}
                  <td>₹{Number(item.product?.price || 0).toFixed(2)}</td>

                  {/* Quantity */}
                  <td>
                    <div
                      className="d-flex align-items-center border rounded-3 overflow-hidden"
                      style={{ width: "fit-content" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light border-0 rounded-0 px-3"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span
                        className="text-center fw-medium"
                        style={{ minWidth: "40px" }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="btn btn-light border-0 rounded-0 px-3"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td>
                    ₹
                    {(
                      Number(item.product?.price || 0) *
                      Number(item.quantity || 0)
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ss-cart-summary" style={{ maxWidth: "320px" }}>
            <p className="total mb-3">Total: ₹{total.toFixed(2)}</p>

            <button className="btn ss-btn-primary text-white w-100">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
