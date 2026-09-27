import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <div className={styles.brand}>
            <i className="bi bi-bag-heart-fill me-1"></i>Shop<span>Sphere</span>
          </div>
          <p className={styles.tagline}>
            Your one-stop destination for quality products at honest prices.
          </p>
          <div className={styles.socialRow}>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>Quick Links</div>
          <ul className={styles.linkList}>
            <li>
              <Link href="/products">Home</Link>
            </li>
            <li>
              <Link href="/products">Shop</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/profile">Account</Link>
            </li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Customer Service</div>
          <ul className={styles.linkList}>
            <li>
              <a href="#">Track Order</a>
            </li>
            <li>
              <a href="/ReturnsAndRefunds">Returns &amp; Refunds</a>
            </li>
            <li>
              <a href="/ShippingPolicy">Shipping Policy</a>
            </li>
            <li>
              <a href="/HelpCenter">Help Center</a>
            </li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Categories</div>
          <ul className={styles.linkList}>
            <li>
              <a href="#">Electronics</a>
            </li>
            <li>
              <a href="#">Fashion</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
            <li>
              <a href="#">Home &amp; Living</a>
            </li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Payment Methods</div>
          <div className={styles.paymentRow}>
            <span className={styles.paymentBadge}>VISA</span>
            <span className={styles.paymentBadge}>Mastercard</span>
            <span className={styles.paymentBadge}>UPI</span>
            <span className={styles.paymentBadge}>PayPal</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} ShopSphere. All rights reserved.
        <a href="/PrivacyPolicy">Privacy Policy</a>|
        <a href="/TermsAndConditions">Terms &amp; Conditions</a>
      </div>
    </footer>
  );
}
