import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnap = await getDocs(collection(db, "products"));
        const items = querySnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {p.name} — ${p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
