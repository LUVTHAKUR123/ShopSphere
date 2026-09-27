import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/api";
export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();

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
      <div className="ss-topbar text-center py-2">
        Free shipping on all orders over ₹999 &nbsp;•&nbsp; Sale is live, up to
        60% off
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark ss-navbar px-3 py-3">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-4" href="/products">
            <i className="bi bi-bag-heart-fill me-2"></i>
            ShopSphere
          </Link>
          {/* Global Search */}
          <div
            className="position-relative flex-grow-1 mx-lg-4 my-3 my-lg-0"
            style={{ maxWidth: "500px", minWidth: 0 }}
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
                  className="form-control rounded-start-pill ps-4"
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
                  className="btn btn-primary rounded-end-pill px-4"
                  aria-label="Search"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            {/* Search Dropdown */}
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
                          : `data:${product.image_mime_type || "image/jpeg"};base64,${product.image_data}`
                        : product.image_url || product.image || "";

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => setShowDropdown(false)}
                          className="d-flex align-items-center gap-3 px-3 py-2 text-decoration-none text-dark border-top"
                        >
                          {/* Product Image */}
                          <div
                            className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: "60px", height: "60px" }}
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

                          {/* Product Details */}
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
                        query: { search: searchQuery.trim() },
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

          {/* Navigation Links */}
          <div className="ms-auto d-flex gap-3 align-items-center flex-wrap">
            <Link className="nav-link text-white" href="/products">
              Shop
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="nav-link text-white d-flex align-items-center gap-1"
            >
              <i className="bi bi-heart position-relative">
                {wishlistCount > 0 && (
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {wishlistCount}
                  </span>
                )}
              </i>
              <span>Wishlist</span>
            </Link>

            {/* Admin */}
            {user?.is_admin && (
              <Link className="nav-link text-white" href="/admin">
                Admin
              </Link>
            )}

            {/* Authentication */}
            {loading ? (
              <div
                style={{ width: "100px", minHeight: "32px" }}
                aria-hidden="true"
              />
            ) : user ? (
              <>
                <Link className="nav-link text-white" href="/profile">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name}
                </Link>

                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link text-white" href="/signin">
                  Sign In
                </Link>

                <Link className="nav-link text-white" href="/signup">
                  Sign Up
                </Link>
              </>
            )}

            {/* Cart */}
            <Link className="btn btn-cart position-relative" href="/cart">
              <i className="bi bi-cart3 me-1"></i>
              Cart
              {cartCount > 0 && (
                <span className="badge rounded-pill bg-danger ms-1">
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
