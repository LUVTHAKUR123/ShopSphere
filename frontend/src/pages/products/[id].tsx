import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api, { Product } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get<Product>(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  async function handleAddToCart() {
    if (!user) {
      router.push("/signin");
      return;
    }
    try {
      await api.post("/cart", { product_id: product?.id, quantity: quantity });
      window.dispatchEvent(new Event("cartUpdated"));
      setMessage("Added to cart!");
    } catch (err) {
      setMessage("Failed to add to cart.");
    }
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="row">
      <div className="col-md-5">
        <img
          src={
            product.image_data
              ? `data:${product.image_mime_type || "image/jpeg"};base64,${product.image_data}`
              : product.image_url || "/images/placeholder.png"
          }
          alt={product.name}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
          }}
        />{" "}
      </div>
      <div className="col-md-7">
        <h2>{product.name}</h2>
        <p className="text-muted">{product.description}</p>
        <h4>₹{product.price}</h4>
        <p>In stock: {product.stock}</p>
        <div className="d-flex gap-2 align-items-center mb-3">
          {/* <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-control"
            style={{ width: "80px" }}
          /> */}
          <div className="d-flex flex-column align-items-start">
            <label className="form-label mb-1">Quantity</label>

            <div className="d-flex align-items-center border rounded overflow-hidden">
              <button
                type="button"
                className="btn btn-outline-secondary border-0 rounded-0 px-3"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="px-3">{quantity}</span>

              <button
                type="button"
                className="btn btn-outline-secondary border-0 rounded-0 px-3"
                onClick={() =>
                  setQuantity((prev) => Math.min(product.stock, prev + 1))
                }
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <button className="btn btn-success mt-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        {message && <p className="text-info">{message}</p>}
      </div>
    </div>
  );
}
