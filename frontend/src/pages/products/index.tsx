import { useEffect, useState } from "react";
import Link from "next/link";
import api, { Product } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import styles from "./ProductListing.module.css";
import CategoriesSection from "../../pages/category/category";
const CATEGORIES = [
  { name: "Electronics", icon: "bi-headphones" },
  { name: "Fashion", icon: "bi-bag-fill" },
  { name: "Shoes", icon: "bi-boot" },
  { name: "Beauty", icon: "bi-stars" },
  { name: "Home & Living", icon: "bi-house-heart-fill" },
  { name: "Sports", icon: "bi-trophy-fill" },
  { name: "Accessories", icon: "bi-watch" },
  { name: "More", icon: "bi-grid-3x3-gap-fill" },
];

const OFFERS = [
  {
    label: "30% OFF",
    color: "#e53e3e",
    title: "On Smart Watches",
    sub: "Premium collection",
    // icon: "bi-smartwatch",
    image: "/images/watch.jpg",
  },
  {
    label: "40% OFF",
    color: "#16a34a",
    title: "On Headphones",
    sub: "Best sound quality",
    image: "/images/headphones.jpg",
  },
  {
    label: "25% OFF",
    color: "#1c1f2b",
    title: "On Cameras",
    sub: "Capture every moment",
    image: "/images/camera.jpg",
  },
  {
    label: "50% OFF",
    color: "#1a3fa0",
    title: "On Shoes",
    sub: "Top brands",
    image: "/images/shoes.jpg",
  },
];

const BRANDS = [
  { name: "Apple", image: "/images/brands/apple.png" },
  { name: "Samsung", image: "/images/brands/samsung.png" },
  { name: "Nike", image: "/images/brands/nike.png" },
  { name: "Adidas", image: "/images/brands/adidas.png" },
  { name: "Sony", image: "/images/brands/sony.png" },
  { name: "Canon", image: "/images/brands/canon.png" },
  { name: "Vivo", image: "/images/brands/vivo.png" },
  { name: "Zara", image: "/images/brands/zara.png" },
];

const STATS = [
  { icon: "bi-people-fill", value: "50K+", label: "Happy Customers" },
  { icon: "bi-box-seam-fill", value: "10K+", label: "Products" },
  { icon: "bi-tags-fill", value: "500+", label: "Brands" },
  { icon: "bi-emoji-smile-fill", value: "99.9%", label: "Satisfaction Rate" },
];

const WHY_CHOOSE_POINTS = [
  "High-quality products from trusted brands",
  "Fast and secure delivery worldwide",
  "Easy returns and refunds",
  "24/7 customer support",
];

const TESTIMONIALS = [
  {
    name: "John D.",
    text: "Amazing quality and fast delivery! The customer support is also excellent.",
  },
  {
    name: "Sarah M.",
    text: "I found everything I needed in one place. Highly recommended!",
  },
  {
    name: "Michael T.",
    text: "Great prices and the products are exactly as described.",
  },
];

function useCountdown(hours: number) {
  const [remaining, setRemaining] = useState(hours * 3600);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const days = Math.floor(remaining / 86400);
  const h = Math.floor((remaining % 86400) / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return { days, h, m, s };
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 8);
  const { user } = useAuth();
  const router = useRouter();
  const countdown = useCountdown(62); // demo countdown, not tied to real backend deal data

  useEffect(() => {
    if (!user) {
      setWishlistIds([]);
      return;
    }

    fetchWishlist();
  }, [user]);

  async function fetchWishlist() {
    try {
      const res = await api.get("/wishlist");

      const ids = res.data.map(
        (item: { product_id: number }) => item.product_id,
      );

      setWishlistIds(ids);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    }
  }

  async function handleWishlist(productId: number) {
    if (!user) {
      router.push("/signin");
      return;
    }

    const isWishlisted = wishlistIds.includes(productId);

    try {
      if (isWishlisted) {
        // Remove product from wishlist
        await api.delete(`/wishlist/${productId}`);
        setWishlistIds((ids) => ids.filter((id) => id !== productId));
      } else {
        // Add product to wishlist
        await api.post("/wishlist", {
          product_id: productId,
        });
        window.dispatchEvent(new Event("wishlistUpdated"));
        setWishlistIds((prev) => [...prev, productId]);
      }
    } catch (error: any) {
      console.error(
        "Wishlist API error:",
        error.response?.data || error.message,
      );

      alert(
        error.response?.data?.message ||
          "Wishlist update failed. Please try again.",
      );
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    setLoading(true);

    const categoryId = router.query.category_id;

    api
      .get<Product[]>("/products", {
        params: categoryId ? { category_id: categoryId } : {},
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [router.isReady, router.query.category_id]);

  async function handleQuickAdd(productId: number) {
    if (!user) {
      router.push("/signin");
      return;
    }
    try {
      await api.post("/cart", { product_id: productId, quantity: 1 });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.saleBadge}>SUMMER SALE</span>
          <h1>
            ShopSphere: Shop Smarter,{" "}
            <span className={styles.accent}>Live Better</span>
          </h1>
          <p>
            Discover top-quality products across every category, at prices that
            make sense.
          </p>
          <div className={styles.heroActions}>
            <Link href="#products" className={styles.btnPrimary}>
              Shop Now
            </Link>
            <Link href="#products" className={styles.btnOutline}>
              Explore Deals
            </Link>
          </div>
          <div className={styles.heroFeatures}>
            <div>
              <i className="bi bi-truck"></i> Free Shipping
            </div>
            <div>
              <i className="bi bi-arrow-repeat"></i> Easy Returns
            </div>
            <div>
              <i className="bi bi-shield-check"></i> Secure Payment
            </div>
            <div>
              <i className="bi bi-headset"></i> 24/7 Support
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/images/heroimage.png" alt="Featured product" />
        </div>
      </section>

      {/* Categories */}
      <h2 className={styles.sectionTitle}>
        Shop by <span className={styles.accent}>Categories</span>
      </h2>
      {/* <div className={styles.categoryGrid}>
        {CATEGORIES.map((c) => (
          <div className={styles.categoryBox} key={c.name}>
            <i className={`bi ${c.icon}`}></i>
            <span>{c.name}</span>
          </div>
        ))}
      </div> */}
      <CategoriesSection />

      {/* Best sellers - real dynamic product data from backend */}
      <div className={styles.sectionHeader} id="products">
        <h2>Best Sellers</h2>
        {products.length > 8 && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowAll(!showAll);
            }}
          >
            {showAll ? "View Less ←" : "View All →"}
          </a>
        )}
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row g-4 mb-4" id="products-section">
          {visibleProducts.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>
              <div className={styles.productCard}>
                <button
                  className={`${styles.wishlistBtn} ${
                    wishlistIds.includes(p.id) ? styles.wishlisted : ""
                  }`}
                  onClick={() => handleWishlist(p.id)}
                  aria-label="Add to wishlist"
                >
                  <i
                    className={`bi ${
                      wishlistIds.includes(p.id) ? "bi-heart-fill" : "bi-heart"
                    }`}
                  ></i>
                </button>
                <Link href={`/products/${p.id}`}>
                  <div className={styles.productImgWrap}>
                    {p.image_data && p.image_mime_type ? (
                      <img
                        src={`data:${p.image_mime_type};base64,${p.image_data}`}
                        alt={p.name}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>
                </Link>
                <div className={styles.productBody}>
                  <Link
                    href={`/products/${p.id}`}
                    className={styles.productName}
                  >
                    {p.name}
                  </Link>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>₹{p.price}</span>
                    <button
                      className={styles.cartBtn}
                      onClick={() => handleQuickAdd(p.id)}
                      aria-label="Add to cart"
                    >
                      <i className="bi bi-cart3"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && <p>No products found.</p>}
        </div>
      )}

      {/* Flash deals - demo countdown, not linked to real backend deal */}
      <div className={styles.flashDeals}>
        <div>
          <h3>
            <i className="bi bi-lightning-charge-fill me-1"></i>Flash Deals
          </h3>
          <p>Hurry up! Limited time offer</p>
          <Link href="#products" className={styles.btnLight}>
            Shop Now
          </Link>
        </div>
        <div className={styles.countdown}>
          <div className={styles.box}>
            <strong>{countdown.days}</strong>
            <span>Days</span>
          </div>
          <div className={styles.box}>
            <strong>{countdown.h}</strong>
            <span>Hours</span>
          </div>
          <div className={styles.box}>
            <strong>{countdown.m}</strong>
            <span>Minutes</span>
          </div>
          <div className={styles.box}>
            <strong>{countdown.s}</strong>
            <span>Seconds</span>
          </div>
        </div>
      </div>

      {/* Special Offers - static, images to be added later */}
      <div className="container-fluid px-0">
        <div
          className={`${styles.sectionHeader} d-flex justify-content-between align-items-center mb-4`}
        >
          <h2 className="mb-0">Special Offers</h2>

          <a href="#" className="text-decoration-none">
            View All Offers →
          </a>
        </div>

        <div className="row g-3 g-md-4">
          {OFFERS.map((o) => (
            <div className="col-12 col-sm-6 col-lg-3" key={o.title}>
              <div
                className={`${styles.offerCard} h-100 d-flex align-items-center justify-content-between`}
              >
                <div className="flex-grow-1">
                  <span
                    className={`${styles.offerBadge} d-inline-block`}
                    style={{ background: o.color }}
                  >
                    {o.label}
                  </span>

                  <h4 className="mt-2 mb-1">{o.title}</h4>

                  <p className="mb-2">{o.sub}</p>

                  <a href="#" className="text-decoration-none fw-semibold">
                    Shop Now →
                  </a>
                </div>

                <img
                  src={o.image}
                  alt={o.title}
                  className="img-fluid flex-shrink-0 ms-2"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Brands - static */}
      <div className={styles.sectionHeader}>
        <h2>Popular Brands</h2>
        <a href="#">View All Brands →</a>
      </div>
      <div className={styles.brandGrid}>
        {BRANDS.map((brand) => (
          <div className={styles.brandBox} key={brand.name}>
            <img
              src={brand.image}
              alt={brand.name}
              className={styles.brandImage}
            />
          </div>
        ))}
      </div>

      {/* Why Choose ShopSphere - static */}
      <div className={styles.whyChoose}>
        <div>
          <h2>
            Why Choose <span className={styles.accent}>ShopSphere</span>?
          </h2>
          <p>
            We provide the best shopping experience with quality products, fast
            delivery, and 24/7 customer support.
          </p>
          <ul className={styles.checkList}>
            {WHY_CHOOSE_POINTS.map((point) => (
              <li key={point}>
                <i className="bi bi-check-circle-fill"></i>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.statGrid}>
          {STATS.map((s) => (
            <div className={styles.statCard} key={s.label}>
              <i className={`bi ${s.icon}`}></i>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature strip */}
      <div className={styles.featureStrip}>
        <div className={styles.featureCard}>
          <i className="bi bi-truck"></i>
          <div>
            <strong>Free Shipping</strong>
            <span>Free shipping on all orders over ₹999</span>
          </div>
        </div>
        <div className={styles.featureCard}>
          <i className="bi bi-arrow-repeat"></i>
          <div>
            <strong>Easy Returns</strong>
            <span>7 days easy return policy</span>
          </div>
        </div>
        <div className={styles.featureCard}>
          <i className="bi bi-shield-check"></i>
          <div>
            <strong>Secure Payment</strong>
            <span>100% secure checkout</span>
          </div>
        </div>
        <div className={styles.featureCard}>
          <i className="bi bi-headset"></i>
          <div>
            <strong>24/7 Support</strong>
            <span>Dedicated support anytime</span>
          </div>
        </div>
      </div>

      {/* Testimonials - placeholder content, not from backend */}
      <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
      <div className={styles.testimonialGrid}>
        {TESTIMONIALS.map((t) => (
          <div className={styles.testimonialCard} key={t.name}>
            <div className={styles.testimonialHead}>
              <div className={styles.avatar}>{t.name.charAt(0)}</div>
              <div>
                <strong>{t.name}</strong>
                <div className="text-warning" style={{ fontSize: "0.8rem" }}>
                  ★★★★★
                </div>
              </div>
            </div>
            <p>{t.text}</p>
          </div>
        ))}
      </div>

      {/* Newsletter - UI only, no backend endpoint wired up */}
      <div className="container-fluid px-0">
        <div className={`${styles.newsletter} row align-items-center g-4`}>
          {/* Left Content */}
          <div className="col-12 col-lg-6">
            <h3 className="mb-2">Subscribe to Our Newsletter</h3>

            <p className="mb-0">
              Get updates on new arrivals and exclusive offers
            </p>
          </div>

          {/* Right Form */}
          <div className="col-12 col-lg-6">
            <form
              className="d-flex flex-column flex-sm-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />

              <button type="submit" className={`${styles.btnPrimary} btn px-4`}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
