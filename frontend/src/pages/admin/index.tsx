import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { Product, Category } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category_id: "",
  brand: "",
  discountPercentage: "",
  sku: "",
  tags: "",
  thumbnail: "",
  images: "",
};

export default function AdminPanel() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryStatus, setCategoryStatus] = useState("active");
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Search, sort, pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | price-low | price-high | name
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user && !user.is_admin) {
      router.push("/products");
      return;
    }
    if (user) {
      fetchProducts();
      fetchCategories();
    }
  }, [user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  async function fetchProducts() {
    try {
      const res = await api.get<Product[]>("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  }

  async function fetchCategories() {
    try {
      const res = await api.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  }

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.sku || "").toLowerCase().includes(q)
    );
  });
  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(a.created_at || 0).getTime() -
          new Date(b.created_at || 0).getTime()
        );
      case "price-low":
        return Number(a.price) - Number(b.price);
      case "price-high":
        return Number(b.price) - Number(a.price);
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return (
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        );
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage),
  );
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  function openCreateProductModal() {
    setEditingId(null);
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setShowProductModal(true);
  }

  function closeProductModal() {
    setShowProductModal(false);
  }

  function openCreateCategoryModal() {
    setNewCategoryName("");
    setCategoryError("");
    setShowCategoryModal(true);
  }

  function closeCategoryModal() {
    setShowCategoryModal(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock || "0");
      if (form.category_id) formData.append("category_id", form.category_id);
      if (form.brand) formData.append("brand", form.brand);
      if (form.discountPercentage) {
        formData.append("discountPercentage", form.discountPercentage);
      }
      if (form.sku) formData.append("sku", form.sku);
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const imagesArray = form.images
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);

      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("images", JSON.stringify(imagesArray));

      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post("/products", formData);
      }

      setForm(emptyForm);
      setImage(null);
      setImagePreview("");
      setEditingId(null);
      setShowProductModal(false);

      fetchProducts();
    } catch (error) {
      console.error("Product save error:", error);
      alert("Product save nahi hua. Please try again.");
    }
  }

  function startEdit(p: Product) {
    setEditingId(p.id);

    setForm({
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      stock: String(p.stock),
      category_id: p.category_id ? String(p.category_id) : "",
      brand: p.brand || "",
      discountPercentage: p.discountPercentage
        ? String(p.discountPercentage)
        : "",
      sku: p.sku || "",
      tags: (p.tags || []).join(", "),
      thumbnail: p.thumbnail || "",
      images: (p.images || []).join(", "),
    });

    setImage(null);

    setImagePreview(
      p.image_data && p.image_mime_type
        ? `data:${p.image_mime_type};base64,${p.image_data}`
        : "",
    );

    setShowProductModal(true);
  }

  function requestDelete(p: Product) {
    setDeleteTarget(p);
  }

  function cancelDelete() {
    if (deleting) return;
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/products/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Product delete nahi hua. Please try again.");
    } finally {
      setDeleting(false);
    }
  }
  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", newCategoryName.trim());
      formData.append("slug", newCategorySlug.trim().toLowerCase());
      formData.append("description", newCategoryDescription);
      formData.append("status", categoryStatus);

      if (categoryImage) {
        formData.append("image", categoryImage);
      }

      // Check FormData values
      console.log("Category FormData:", Array.from(formData.entries()));

      await api.post("/categories", formData);

      setNewCategoryName("");
      setNewCategorySlug("");
      setNewCategoryDescription("");
      setCategoryImage(null);
      setCategoryImagePreview("");
      setCategoryStatus("active");
      setCategoryError("");

      closeCategoryModal();
      fetchCategories();
    } catch (error: any) {
      console.error("Create category error:", error.response?.data || error);

      setCategoryError(
        error.response?.data?.message ||
          "Category create nahi hui. Please try again.",
      );
    }
  }

  if (!user || !user.is_admin) return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Panel — Manage Products</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={openCreateCategoryModal}
          >
            <i className="bi bi-tags me-1"></i>Create Category
          </button>
          <button className="btn btn-primary" onClick={openCreateProductModal}>
            <i className="bi bi-plus-lg me-1"></i>Create Product
          </button>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, brand, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-center text-muted">
          {sortedProducts.length} product
          {sortedProducts.length !== 1 ? "s" : ""}
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>
                {categories.find((c) => c.id === p.category_id)?.name || "—"}
              </td>
              <td>{p.brand || "—"}</td>
              <td>₹{p.price}</td>
              <td>{p.discountPercentage ? `${p.discountPercentage}%` : "—"}</td>
              <td>{p.stock}</td>
              <td>
                {p.image_data && p.image_mime_type ? (
                  <img
                    src={`data:${p.image_mime_type};base64,${p.image_data}`}
                    alt={p.name}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => requestDelete(p)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {sortedProducts.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-muted">
                {products.length === 0
                  ? 'No products yet. Click "Create Product" to add one.'
                  : "No products match your search."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-muted">
            Page {currentPage} of {totalPages}
          </span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <i className="bi bi-chevron-left"></i> Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`btn btn-sm ${
                  page === currentPage ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Product Modal */}
      {showProductModal && (
        <div
          onClick={closeProductModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "24px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">
                {editingId ? "Edit Product" : "Create Product"}
              </h4>
              <button
                className="btn-close"
                onClick={closeProductModal}
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-2 mb-3">
                <div className="col-md-8">
                  <label className="form-label">Name</label>
                  <input
                    placeholder="Product name"
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">SKU</label>
                  <input
                    placeholder="e.g. SHOE-001"
                    className="form-control"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={form.category_id}
                    onChange={(e) =>
                      setForm({ ...form, category_id: e.target.value })
                    }
                  >
                    <option value="">— No category —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Brand</label>
                  <input
                    placeholder="e.g. Nike"
                    className="form-control"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>

              {imagePreview && (
                <div className="mb-3">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    width={120}
                    height={120}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}

              <div className="row g-2 mb-3">
                <div className="col-4">
                  <label className="form-label">Price</label>
                  <input
                    placeholder="Price"
                    type="number"
                    className="form-control"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Discount %</label>
                  <input
                    placeholder="0"
                    type="number"
                    min={0}
                    max={100}
                    className="form-control"
                    value={form.discountPercentage}
                    onChange={(e) =>
                      setForm({ ...form, discountPercentage: e.target.value })
                    }
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Stock</label>
                  <input
                    placeholder="Stock"
                    type="number"
                    className="form-control"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  placeholder="e.g. running, lightweight, summer"
                  className="form-control"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label">Thumbnail URL</label>
                  <input
                    placeholder="https://..."
                    className="form-control"
                    value={form.thumbnail}
                    onChange={(e) =>
                      setForm({ ...form, thumbnail: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">
                    Extra Image URLs (comma separated)
                  </label>
                  <input
                    placeholder="https://..., https://..."
                    className="form-control"
                    value={form.images}
                    onChange={(e) =>
                      setForm({ ...form, images: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Description"
                  className="form-control"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeProductModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCategoryModal && (
        <div
          onClick={closeCategoryModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "24px",
              width: "100%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Create Category</h4>

              <button
                type="button"
                className="btn-close"
                onClick={closeCategoryModal}
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleCreateCategory}>
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label">Category Name *</label>
                <input
                  className="form-control"
                  placeholder="e.g. Electronics"
                  value={newCategoryName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewCategoryName(value);
                    setNewCategorySlug(generateSlug(value));
                  }}
                  required
                  autoFocus
                />
              </div>

              {/* Category Slug */}
              <div className="mb-3">
                <label className="form-label">Category Slug *</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. electronics"
                  value={newCategorySlug}
                  onChange={(e) =>
                    setNewCategorySlug(generateSlug(e.target.value))
                  }
                  required
                />

                <small className="text-muted">
                  URL-friendly category name, e.g. electronics-accessories
                </small>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter category description"
                  rows={3}
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
              </div>

              {/* Category Image */}
              <div className="mb-3">
                <label className="form-label">Category Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setCategoryImage(file);
                      setCategoryImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />

                {categoryImagePreview && (
                  <div className="mt-3">
                    <img
                      src={categoryImagePreview}
                      alt="Category preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "5px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={categoryStatus}
                  onChange={(e) => setCategoryStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Error */}
              {categoryError && <p className="text-danger">{categoryError}</p>}

              {/* Buttons */}
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeCategoryModal}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          onClick={cancelDelete}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1060,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "24px",
              width: "100%",
              maxWidth: "380px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#fdeaea",
                color: "#e53e3e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                margin: "0 auto 14px",
              }}
            >
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>

            <h5 className="mb-2">Delete this product?</h5>
            <p className="text-muted mb-4">
              <strong>{deleteTarget.name}</strong> will be permanently removed.
              This action cannot be undone.
            </p>

            <div className="d-flex gap-2 justify-content-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={cancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
