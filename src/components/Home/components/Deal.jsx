import {useNavigate} from 'react-router-dom';

export default function Deals ({deal}){
    const navigate = useNavigate();

    function handleClick(){
        navigate(`/category/${deal.category}`)
    }
    return (
    <div className="deal-card" onClick={handleClick}>
      <h3>{deal.title}</h3>
      <img src={deal.image} alt={deal.title} />
      <p className="deal-discount">{deal.discount}</p>
      <p className="deal-description">{deal.description}</p>
      <span className="deal-cta">Shop Now →</span>
    </div>
  );
}