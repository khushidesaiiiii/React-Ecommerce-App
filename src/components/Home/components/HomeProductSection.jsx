
import ProductCard from "../../ProductCard/ProductCard";

export default function HomeProuductSection({ title, products }) {

  if (!products) return;

  return (
    <section className="home-product-section">
      <h2>{title}</h2>
      <div className="grid" style={{marginBottom: "2rem"}}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
