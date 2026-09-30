import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      const res = await api.post("/auth/signup", { name, email, password });
      login(res.data.user);
      router.push("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  }

  return (
    <div className="ss-split-wrap ss-auth-shell">
      {/* Left side */}
      <div className="ss-split-left">
        <span className="ss-badge-pill">
          <i className="bi bi-star-fill"></i> Welcome to ShopSphere
        </span>
        <h1>Create Your Account</h1>
        <h1 className="accent">and Start Shopping!</h1>
        <p>
          Join ShopSphere today and explore a world of amazing products,
          exclusive offers and great savings.
        </p>

        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-gift-fill"></i>
          </div>
          <div>
            <strong>Exclusive Offers</strong>
            <span>Get access to exclusive deals and discounts</span>
          </div>
        </div>
        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-shield-check"></i>
          </div>
          <div>
            <strong>Secure Shopping</strong>
            <span>Your data is safe with us</span>
          </div>
        </div>
        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-truck"></i>
          </div>
          <div>
            <strong>Fast Delivery</strong>
            <span>Quick and reliable delivery at your doorstep</span>
          </div>
        </div>
        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-heart-fill"></i>
          </div>
          <div>
            <strong>Wishlist &amp; Save</strong>
            <span>Save your favorite items for later</span>
          </div>
        </div>

        {/* <div className="ss-illustration">
          <div className="bag light">
            <i className="bi bi-gift"></i>
          </div>
          <div className="bag">
            <i className="bi bi-bag-heart-fill"></i>
          </div>
          <div className="phone">
            <div className="phone-screen">
              <i className="bi bi-shop"></i>
            </div>
          </div>
        </div> */}
      </div>

      {/* Right side */}
      <div className="ss-split-right">
        <div className="ss-form-card">
          <h2>Sign Up</h2>
          <p>Create an account to get started with ShopSphere</p>

          <form onSubmit={handleSubmit}>
            <div className="ss-input-group">
              <label>Full Name</label>
              <i className="bi bi-person icon-left"></i>
              <input
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="ss-input-group">
              <label>Email Address</label>
              <i className="bi bi-envelope icon-left"></i>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="ss-input-group">
              <label>Password</label>
              <i className="bi bi-lock icon-left"></i>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>

            <div className="ss-input-group">
              <label>Confirm Password</label>
              <i className="bi bi-lock icon-left"></i>
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label="Toggle confirm password visibility"
              >
                <i
                  className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>

            <div
              className="ss-form-row"
              style={{ justifyContent: "flex-start" }}
            >
              <label className="d-flex align-items-center gap-2 mb-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              type="submit"
              className="btn ss-btn-primary text-white w-100 py-2"
            >
              Create Account
            </button>
          </form>

          <div className="ss-divider">or sign up with</div>

          <div className="ss-social-row">
            <button type="button" className="ss-social-btn">
              <i className="bi bi-google"></i> Google
            </button>
            <button type="button" className="ss-social-btn">
              <i className="bi bi-facebook"></i> Facebook
            </button>
            <button type="button" className="ss-social-btn">
              <i className="bi bi-apple"></i> Apple
            </button>
          </div>

          {/* <p className="ss-secure-note mb-3">
            <i className="bi bi-shield-lock me-1"></i>
            Secure registration with 256-bit SSL encryption
          </p> */}

          <p className="text-center mb-0">
            Already have an account? <Link href="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
