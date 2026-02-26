import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { toggleWishlist } from "../store/wishlistSlice";

export default function WishlistButton ({product}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authUser = useSelector((state) => state.auth.user);

    const items = useSelector((state) => state.wishlist.items);

    const isWishlisted = items.some(
        (p) => p.id === product.id
    );

    const handleWishlist = () => {
        if(authUser) {
            dispatch(toggleWishlist(product));
        }
        if(!authUser) {
            toast.error("Please login to wishlist Item");
            navigate("/login");
        }
    } 

    return(
        <button onClick={handleWishlist} className="wishlist-button" >
            {isWishlisted ? "❤️" : "🤍"}
        </button>
    )
}