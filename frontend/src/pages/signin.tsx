import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/signin", { email, password });
      login(res.data.token, res.data.user);
      router.push("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    }
  }

  return (
    <div className="ss-split-wrap ss-auth-shell">
      {/* Left side */}
      <div className="ss-split-left">
        <h1>Welcome Back!</h1>
        <h1 className="accent">Glad to See You Again 👋</h1>
        <p>
          Sign in to your account and explore a world of amazing products,
          exclusive deals and faster checkout.
        </p>

        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-tag-fill"></i>
          </div>
          <div>
            <strong>Exclusive Deals</strong>
            <span>Access members-only offers &amp; discounts</span>
          </div>
        </div>
        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-truck"></i>
          </div>
          <div>
            <strong>Faster Shopping</strong>
            <span>Saved addresses &amp; payment methods</span>
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
        <div className="ss-feature-item">
          <div className="icon-badge">
            <i className="bi bi-shield-check"></i>
          </div>
          <div>
            <strong>Secure &amp; Reliable</strong>
            <span>Your data is always safe with us</span>
          </div>
        </div>
        {/* 
        <div className="ss-illustration">
          <div className="bag light">
            <i className="bi bi-bag"></i>
          </div>
          <div className="bag">
            <i className="bi bi-cart3"></i>
          </div>
          <div className="phone">
            <div className="phone-screen">
              <i className="bi bi-bag-heart-fill"></i>
            </div>
          </div>
        </div> */}
      </div>

      {/* Right side */}
      <div className="ss-split-right">
        <div className="ss-form-card">
          <h2>Sign In</h2>
          <p>Welcome back! Please sign in to continue</p>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
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

            <div className="ss-form-row">
              <label className="d-flex align-items-center gap-2 mb-0">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button
              type="submit"
              className="btn ss-btn-primary text-white w-100 py-2"
            >
              Sign In
            </button>
          </form>

          <div className="ss-divider">or continue with</div>

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

          <p className="ss-secure-note mb-3">
            <i className="bi bi-shield-lock me-1"></i>
            Secure login with 256-bit SSL encryption
          </p>

          <p className="text-center mb-0">
            Don&apos;t have an account?{" "}
            <Link href="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
