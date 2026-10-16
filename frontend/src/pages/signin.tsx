import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { signInSchema } from "@/validations/validationSchemas";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validationSchema: signInSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setError("");

      try {
        const res = await api.post("/auth/signin", {
          email: values.email.trim(),
          password: values.password,
          remember: values.remember,
        });

        login(res.data.user);

        toast.success("Signed in successfully!");
        await router.push("/products");
      } catch (err: any) {
        const message = err.response?.data?.message || "Sign in failed";

        setError(message);
        toast.error(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
      </div>

      {/* Right side */}
      <div className="ss-split-right">
        <div className="ss-form-card">
          <h2>Sign In</h2>
          <p>Welcome back! Please sign in to continue</p>

          <form onSubmit={formik.handleSubmit} noValidate>
            {/* Email */}
            <div className="ss-input-group">
              <label htmlFor="email">Email Address</label>

              <i className="bi bi-envelope icon-left"></i>

              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={(e) => {
                  setError("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                autoComplete="email"
                aria-invalid={Boolean(
                  formik.touched.email && formik.errors.email,
                )}
                aria-describedby="email-error"
              />

              {formik.touched.email && formik.errors.email && (
                <div id="email-error" className="invalid-feedback d-block">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="ss-input-group">
              <label htmlFor="password">Password</label>

              <i className="bi bi-lock icon-left"></i>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={(e) => {
                  setError("");
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                aria-invalid={Boolean(
                  formik.touched.password && formik.errors.password,
                )}
                aria-describedby="password-error"
              />

              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>

              {formik.touched.password && formik.errors.password && (
                <div id="password-error" className="invalid-feedback d-block">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Remember me and Forgot Password */}
            <div className="ss-form-row">
              <label className="d-flex align-items-center gap-2 mb-0">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                Remember me
              </label>

              <Link href="/forgot-password">Forgot Password?</Link>
            </div>

            {/* API error */}
            {error && (
              <div className="alert alert-danger py-2 mt-3" role="alert">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="btn ss-btn-primary text-white w-100 py-2"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
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
