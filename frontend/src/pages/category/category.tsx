"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import styles from "./category.module.css";
import { useRouter } from "next/router";
interface Category {
  id: number;
  name: string;
  slug: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  electronics: "bi-phone",
  mobiles: "bi-phone",
  laptops: "bi-laptop",
  monitors: "bi-display",
  tablets: "bi-tablet",
  fashion: "bi-bag",
  "home-kitchen": "bi-house",
  "beauty-personal-care": "bi-heart",
  "sports-outdoors": "bi-dribbble",
  "books-stationery": "bi-book",
  "toys-games": "bi-controller",
  grocery: "bi-basket",
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        const data = Array.isArray(response.data)
          ? response.data
          : (response.data.categories ?? []);

        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  if (loading) {
    return <p className={styles.loading}>Loading categories...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <section className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Shop by <span className={styles.accent}>Categories</span>
        </h2>
      </div>

      {categories.length === 0 ? (
        <p className={styles.emptyMessage}>No categories available.</p>
      ) : (
        <>
          <div className={styles.categoryGrid}>
            {visibleCategories.map((category) => (
              <div
                className={styles.categoryBox}
                key={category.id}
                onClick={() =>
                  router.push(
                    `/products?category_id=${category.id}#products-section`,
                  )
                }
              >
                <i
                  className={`bi ${CATEGORY_ICONS[category.slug] || "bi-grid"}`}
                ></i>

                <span>{category.name}</span>
              </div>
            ))}
          </div>

          {categories.length > 4 && (
            <div className={styles.viewButtonWrapper}>
              <button
                className={styles.viewButton}
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "View Less" : "View All"}
                <i
                  className={`bi ${
                    showAll ? "bi-chevron-up" : "bi-chevron-down"
                  }`}
                ></i>
              </button>
              {router.query.category_id && (
                <button
                  onClick={() => {
                    router.push("/products#products-section");
                  }}
                  className={styles.resetButton}
                >
                  <i className="bi bi-arrow-counterclockwise"></i>
                  Reset Filter
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
