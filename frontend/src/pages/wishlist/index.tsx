import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/api";
import styles from "./wishlist.module.css";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: number;
  name: string;
  price: number;
  brand?: string;
  image_data?: string | null;
  image_mime_type?: string | null;
}

interface WishlistItem {
  id: number;
  product_id: number;
  product: Product;
}

export default function Wishlist() {
  const router = useRouter();
  const { user } = useAuth();

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      //    setWishlistIds([])
      return;
    }

    fetchWishlist();
  }, [user]);

  async function fetchWishlist() {
    try {
      const res = await api.get("/wishlist");

      setItems(res.data);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(productId: number) {
    try {
      await api.delete(`/wishlist/${productId}`);

      setItems((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  }

  async function handleAddToCart(productId: number) {
    if (!user) {
      router.push("/signin");
      return;
    }

    try {
      await api.post("/cart", {
        product_id: productId,
        quantity: 1,
      });
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  }

  if (loading) {
    return <p className={styles.message}>Loading wishlist...</p>;
  }

  if (!user) {
    return (
      <div className={styles.emptyWishlist}>
        <i className="bi bi-heart"></i>
        <h2>Please sign in</h2>
        <p>Sign in to view your wishlist.</p>
        <button onClick={() => router.push("/signin")}>Sign In</button>
      </div>
    );
  }

  return (
    <main className={styles.wishlistPage}>
      <div className={styles.header}>
        <h1>
          My <span>Wishlist</span>
        </h1>
        <p>{items.length} saved products</p>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyWishlist}>
          <i className="bi bi-heart"></i>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite products to find them here.</p>

          <button onClick={() => router.push("/products")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className={styles.wishlistGrid}>
          {items.map((item) => {
            const product = item.product;

            const imageSrc = product.image_data
              ? `data:${
                  product.image_mime_type || "image/jpeg"
                };base64,${product.image_data}`
              : null;

            return (
              <div className={styles.wishlistCard} key={item.id}>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.product_id)}
                  aria-label="Remove from wishlist"
                >
                  <i className="bi bi-heart-fill"></i>
                </button>

                <div className={styles.productImage}>
                  {imageSrc ? (
                    <img src={imageSrc} alt={product.name} />
                  ) : (
                    <i className="bi bi-image"></i>
                  )}
                </div>

                <div className={styles.productInfo}>
                  <p className={styles.brand}>
                    {product.brand || "ShopSphere"}
                  </p>

                  <h3>{product.name}</h3>

                  <p className={styles.price}>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <button
                    className={styles.cartBtn}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <i className="bi bi-cart3"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
