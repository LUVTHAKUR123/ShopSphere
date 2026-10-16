import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { signUpSchema } from "@/validations/validationSchemas";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: true,
    },
    mode: "onBlur",
  });

  const passwordValue = watch("password");

  const onSubmit = async (values: SignUpFormValues) => {
    setServerError("");
    clearErrors("root");

    try {
      const res = await api.post("/auth/signup", {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      login(res.data.user);
      toast.success("Signed up successfully!");
      await router.push("/products");
    } catch (err: any) {
      const message = err.response?.data?.message || "Sign up failed";

      setServerError(message);
      setError("root.server", { message });
      toast.error(message);
    }
  };

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
      </div>

      {/* Right side */}
      <div className="ss-split-right">
        <div className="ss-form-card">
          <h2>Sign Up</h2>
          <p>Create an account to get started with ShopSphere</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div className="ss-input-group">
              <label htmlFor="name">Full Name</label>
              <i className="bi bi-person icon-left"></i>

              <input
                id="name"
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name", {
                  onChange: () => setServerError(""),
                })}
              />

              {errors.name && (
                <div id="name-error" className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="ss-input-group">
              <label htmlFor="email">Email Address</label>
              <i className="bi bi-envelope icon-left"></i>

              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email address"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email", {
                  onChange: () => setServerError(""),
                })}
              />

              {errors.email && (
                <div id="email-error" className="invalid-feedback d-block">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="ss-input-group">
              <label htmlFor="password">Password</label>
              <i className="bi bi-lock icon-left"></i>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Create a password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password", {
                  onChange: () => setServerError(""),
                })}
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

              {errors.password && (
                <div id="password-error" className="invalid-feedback d-block">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="ss-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <i className="bi bi-lock icon-left"></i>

              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                {...register("confirmPassword", {
                  onChange: () => setServerError(""),
                })}
              />

              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <i
                  className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>

              {errors.confirmPassword && (
                <div
                  id="confirm-password-error"
                  className="invalid-feedback d-block"
                >
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            {/* Terms and Privacy */}
            <div
              className="ss-form-row"
              style={{ justifyContent: "flex-start" }}
            >
              <label className="d-flex align-items-center gap-2 mb-0">
                <input type="checkbox" {...register("agreed")} />

                <span>
                  I agree to the <Link href="/terms">Terms of Service</Link> and{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {errors.agreed && (
              <p className="text-danger mt-2 mb-2">{errors.agreed.message}</p>
            )}

            {/* API Error */}
            {serverError && (
              <div className="alert alert-danger py-2 mt-3" role="alert">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn ss-btn-primary text-white w-100 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
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

          <p className="text-center mb-0">
            Already have an account? <Link href="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
