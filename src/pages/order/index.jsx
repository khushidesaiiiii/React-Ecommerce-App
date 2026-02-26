import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";

import Button from "../../UI/Button";
import { fetchOrders } from "../../store/orderSlice";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleNavigation = () => navigate("/all-products");

  const authUser = useSelector((state) => state.auth?.user);
  const userId = authUser?.id;

  const userOrders = useSelector((state) => state.orders?.userOrders || []);
  const list = useSelector((state) => state.orders?.list || []);
  //   console.log("Order: ", list);

  const {loading, error} = useSelector((state) => state.orders);

  const apiCart = useMemo(() => {
    if (!userId) {
      return [];
    }
    return list?.filter((cart) => cart.userId === Number(userId)) ?? [];
  }, [list, userId]);
  //console.log("ApiCArt: ", apiCart);

  const combinedOrders = useMemo(() => {
    return [...userOrders, ...apiCart];
  }, [apiCart, userOrders]);

  if(loading) return <p className="para">Loading...</p>
  if(error) return <p className="para">{error.message}</p>

  if (combinedOrders.length === 0) {
    return (
      <div className="wishlist-page"> 
        <h2>Order Page</h2>
        <div>
          <p className="para">No orders yet!! </p>
          <span>Start shopping today!!</span>
          <hr />
          <Button onClick={handleNavigation}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-order-page">
      <h2>Order Page</h2>
      <div className="user-orders-grid">
        {apiCart.length === 0
          ? userOrders.map((order) => (
              <div className="user-order-card" key={order.id}>
                <h4>#{order.id}</h4>
                <h5>Total: {order.total}</h5>
                <p>Total Products: {order.totalProducts}</p>
                <div className="order-card-products">
                  {order.products.map((product) => (
                    <div key={product.id}>
                      <Card>
                        <img src={product.thumbnail} alt={product.title} />
                        <CardBody>
                          <CardTitle tag={"h5"}>{product.title}</CardTitle>
                          <CardSubtitle tag={"h6"}>
                            {product.total}
                          </CardSubtitle>
                          <CardText>
                            Quantity: {product.quantity} x Price:{" "}
                            {product.price}{" "}
                          </CardText>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : combinedOrders.map((order) => (
              <div className="user-order-card" key={order.id}>
                <h4>#{order.id}</h4>
                <h5>Total: {order.total}</h5>
                <p>Total Products: {order.totalProducts}</p>
                <div className="order-card-products">
                  {order.products.map((product) => (
                    <div key={product.id}>
                      <Card>
                        <img src={product.thumbnail} alt={product.title} />
                        <CardBody>
                          <CardTitle tag={"h5"}>{product.title}</CardTitle>
                          <CardSubtitle tag={"h6"}>
                            {product.total.toFixed(2)}
                          </CardSubtitle>
                          <CardText>
                            Quantity: {product.quantity} x Price:{" "}
                            {product.price}{" "}
                          </CardText>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
