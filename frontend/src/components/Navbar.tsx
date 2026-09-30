import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    let isActive = true;

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const res = await api.get("/products");

        const products = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.products)
            ? res.data.products
            : [];

        const filtered = products.filter((product: any) =>
          product.name?.toLowerCase().includes(query.toLowerCase()),
        );

        if (isActive) {
          setSearchResults(filtered.slice(0, 6));
        }
      } catch (error) {
        console.error("Search API error:", error);

        if (isActive) {
          setSearchResults([]);
        }
      } finally {
        if (isActive) {
          setSearchLoading(false);
        }
      }
    }, 300);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      setCartCount(0);
      return;
    }

    async function fetchCounts() {
      try {
        const [wishlistRes, cartRes] = await Promise.all([
          api.get("/wishlist"),
          api.get("/cart"),
        ]);

        const wishlist = Array.isArray(wishlistRes.data)
          ? wishlistRes.data
          : [];

        const cart = Array.isArray(cartRes.data) ? cartRes.data : [];

        setWishlistCount(wishlist.length);

        setCartCount(
          cart.reduce(
            (sum: number, item: any) => sum + Number(item.quantity || 1),
            0,
          ),
        );
      } catch (error) {
        console.error("Count fetch error:", error);
      }
    }

    fetchCounts();
  }, [user]);

  // Global Product Search
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    router.push({
      pathname: "/products",
      query: { search: query },
    });
  }

  function handleLogout() {
    logout();
    router.push("/signin");
  }

  return (
    <>
      {/* Topbar */}
      <div className="ss-topbar text-center py-2 px-2 small">
        Free shipping on all orders over ₹999
        <span className="mx-2">•</span>
        Sale is live, up to <strong>60% off</strong>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-dark ss-navbar py-2">
        <div className="container-fluid px-3 px-lg-4">
          {/* ================= LOGO ================= */}
          <Link
            href="/products"
            className="navbar-brand fw-bold d-flex align-items-center me-3"
          >
            <span
              style={{
                width: "34px",
                height: "34px",
                display: "inline-flex",
                borderRadius: "13px",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="/images/Shopsphere.png"
                alt="ShopSphere"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </span>
            {/* Desktop / Tablet: Show name */}
            <span className="ms-2 d-none d-sm-inline">ShopSphere</span>
          </Link>

          {/* ================= SEARCH ================= */}
          <div
            ref={accountMenuRef}
            className="position-relative "
            style={{ maxWidth: "550px", minWidth: 0 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const query = searchQuery.trim();

                if (!query) return;

                setShowDropdown(false);

                router.push({
                  pathname: "/products",
                  query: { search: query },
                });
              }}
            >
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded-start-pill ps-3"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  aria-label="Search products"
                />

                <button
                  type="submit"
                  className="btn btn-primary rounded-end-pill px-3 px-lg-4"
                  aria-label="Search"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            {/* ================= SEARCH DROPDOWN ================= */}
            {showDropdown && searchQuery.trim().length >= 2 && (
              <div
                className="position-absolute bg-white shadow-lg border rounded-4 mt-2 overflow-hidden"
                style={{
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 1050,
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {searchLoading ? (
                  <div className="text-center py-4 text-secondary">
                    <div className="spinner-border spinner-border-sm text-primary me-2" />
                    Searching products...
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="px-3 pt-3 pb-2 small text-secondary fw-semibold">
                      PRODUCTS ({searchResults.length})
                    </div>

                    {searchResults.map((product: any) => {
                      const imageSrc = product.image_data
                        ? product.image_data.startsWith("data:")
                          ? product.image_data
                          : `data:${
                              product.image_mime_type || "image/jpeg"
                            };base64,${product.image_data}`
                        : product.image_url || product.image || "";

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => setShowDropdown(false)}
                          className="d-flex align-items-center gap-3 px-3 py-2 text-decoration-none text-dark border-top"
                        >
                          <div
                            className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: "60px",
                              height: "60px",
                            }}
                          >
                            {imageSrc ? (
                              <img
                                src={imageSrc}
                                alt={product.name}
                                className="img-fluid rounded-3"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              <i className="bi bi-image text-secondary fs-4"></i>
                            )}
                          </div>

                          <div className="flex-grow-1 overflow-hidden">
                            <div className="fw-semibold text-truncate">
                              {product.name}
                            </div>

                            <div className="text-primary fw-bold mt-1">
                              ₹
                              {Number(product.price || 0).toLocaleString(
                                "en-IN",
                              )}
                            </div>
                          </div>

                          <i className="bi bi-arrow-up-left text-secondary"></i>
                        </Link>
                      );
                    })}

                    <Link
                      href={{
                        pathname: "/products",
                        query: {
                          search: searchQuery.trim(),
                        },
                      }}
                      onClick={() => setShowDropdown(false)}
                      className="d-block text-center text-primary fw-semibold text-decoration-none py-3 border-top"
                    >
                      View all results
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-4 px-3">
                    <i className="bi bi-search fs-3 text-secondary"></i>

                    <p className="fw-semibold mt-2 mb-1 text-dark">
                      No products found
                    </p>

                    <p className="text-secondary small mb-0">
                      Try searching with a different product name.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ================= NAVIGATION ================= */}
          <div className="d-flex align-items-center gap-0.5 gap-lg-3 flex-shrink-0">
            {/* Shop */}
            <Link
              href="/products"
              className="text-white text-decoration-none d-none d-md-flex align-items-center gap-1 fw-semibold"
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
              <span>Shop</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-white text-decoration-none position-relative d-flex align-items-center gap-1 fw-semibold"
            >
              <i className="bi bi-heart fs-5"></i>

              <span className="d-none d-lg-inline">Wishlist</span>

              {wishlistCount > 0 && (
                <span
                  className="badge rounded-pill bg-danger position-absolute"
                  style={{
                    top: "-10px",
                    right: "-8px",
                    fontSize: "10px",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* ================= ACCOUNT ================= */}
            {loading ? (
              <div
                style={{
                  width: "40px",
                  height: "32px",
                }}
              />
            ) : user ? (
              <div className="position-relative">
                <button
                  type="button"
                  className="btn text-white p-1 d-flex align-items-center gap-1"
                  onClick={() => setShowAccountMenu((prev) => !prev)}
                  aria-expanded={showAccountMenu}
                >
                  <i className="bi bi-person-circle fs-5"></i>

                  {/* Desktop name */}
                  <span className="d-none d-lg-inline fw-semibold">
                    {user.name}
                  </span>

                  <i
                    className={`bi ${
                      showAccountMenu ? "bi-chevron-up" : "bi-chevron-down"
                    } d-none d-lg-inline`}
                    style={{ fontSize: "11px" }}
                  ></i>
                </button>

                {/* ACCOUNT DROPDOWN */}
                {showAccountMenu && (
                  <div
                    className="position-absolute bg-white shadow-lg rounded-4 overflow-hidden"
                    style={{
                      top: "calc(100% + 10px)",
                      right: 0,
                      width: "210px",
                      zIndex: 1100,
                    }}
                  >
                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setShowAccountMenu(false)}
                      className="d-flex align-items-center gap-3 px-3 py-3 text-dark text-decoration-none"
                    >
                      <i className="bi bi-person-circle fs-5 text-primary"></i>

                      <div>
                        <div className="fw-semibold">Profile</div>

                        <small className="text-secondary">
                          View your profile
                        </small>
                      </div>
                    </Link>

                    {/* Wishlist */}
                    <Link
                      href="/wishlist"
                      onClick={() => setShowAccountMenu(false)}
                      className="d-flex align-items-center gap-3 px-3 py-3 text-dark text-decoration-none border-top"
                    >
                      <i className="bi bi-heart fs-5 text-danger"></i>

                      <div>
                        <div className="fw-semibold">My Wishlist</div>

                        <small className="text-secondary">Saved products</small>
                      </div>
                    </Link>

                    {/* Admin */}
                    {user.is_admin && (
                      <Link
                        href="/admin"
                        onClick={() => setShowAccountMenu(false)}
                        className="d-flex align-items-center gap-3 px-3 py-3 text-dark text-decoration-none border-top"
                      >
                        <i className="bi bi-speedometer2 fs-5 text-primary"></i>

                        <div className="fw-semibold">Admin Panel</div>
                      </Link>
                    )}

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="btn btn-link text-danger text-decoration-none w-100 text-start d-flex align-items-center gap-3 px-3 py-3 border-top"
                    >
                      <i className="bi bi-box-arrow-right fs-5"></i>

                      <span className="fw-semibold">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  className="text-white text-decoration-none fw-semibold d-none d-sm-inline"
                  href="/signin"
                >
                  Sign In
                </Link>

                <Link
                  className="btn btn-outline-light btn-sm d-none d-sm-inline-block"
                  href="/signup"
                >
                  Sign Up
                </Link>

                {/* Mobile login icon */}
                <Link
                  href="/signin"
                  className="text-white d-sm-none"
                  aria-label="Sign In"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </Link>
              </>
            )}

            {/* ================= CART ================= */}
            <Link
              className="btn btn-warning position-relative d-flex align-items-center"
              href="/cart"
              aria-label="Cart"
            >
              <i className="bi bi-cart3 fs-5"></i>

              <span className="d-none d-sm-inline ms-1">Cart</span>

              {cartCount > 0 && (
                <span
                  className="badge rounded-pill bg-danger position-absolute"
                  style={{
                    top: "-9px",
                    right: "-8px",
                    fontSize: "10px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
