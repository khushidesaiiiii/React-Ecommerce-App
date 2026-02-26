import { Link } from "react-router-dom";

export default function Card({ title, image, children, key}) {
  return (
    <div key={key}>
      {image && (
        <img src={image} alt={title} className="card-image" loading="lazy" />
      )}

      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
