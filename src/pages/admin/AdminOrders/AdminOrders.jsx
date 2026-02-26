import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

import { fetchOrders, selectedOrder } from "../../../store/orderSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { list, selectOrder, loading, error } = useSelector(
    (state) => state.orders,
  );
  // console.log("list : ", list);
  // const state = useSelector((state) => state);
  // console.log("REDUX STATE:", state);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const statusPaid = useMemo(() => {
    const map = {};
    list.forEach((order) => {
      map[order.id] = ["paid", "completed", "delivered"][
        Math.floor(Math.random() * 3)
      ];
    });
    return map;
  }, [list]);

  if (loading) return <p className="para">Loading...</p>;
  if (error) return <p className="para">{error}</p>;

  return (
    <div className={`order-page ${selectOrder ? "active-order" : ""}`}>
      <div className={`order-list ${selectOrder ? "narrowed" : ""}`}>
        <h2>Orders</h2>
        <div className="order-grid-header">
          <span>Order ID</span>
          <span>User ID</span>
          <span>Items</span>
          <span>Status</span>
          <span>Total</span>
        </div>
        {list.map((order) => {
          return (
            <div
              key={order.id}
              onClick={() => dispatch(selectedOrder(order))}
              className={`order-row ${
                selectOrder?.id === order.id ? "active" : ""
              }`}
            >
              <span className="order-id">#{order.id}</span>
              <span className="order-user-id">{order.userId}</span>
              <span className="order-totalproducts">{order.totalProducts}</span>
              <span className={`statuspaid-${statusPaid[order.id]}`}>
                {statusPaid[order.id]}
              </span>
              <span className="order-total-bill">${order.total}</span>
            </div>
          );
        })}
      </div>
      {selectOrder && (
        <div className="order-details">
          <div className="order-header">
            <h3>order #{selectOrder.id}</h3>
            <h4>User: {selectOrder.userId}</h4>
          </div>
          <div className="order-products">
            {selectOrder.products.map((p) => (
              <div key={p.id} className="order-product">
                <Card className="order-product-card">
                  <img src={p.thumbnail} alt={p.title} />
                  <CardBody>
                    <CardTitle tag="h5">{p.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {p.quantity} × ${p.price.toFixed(2)}
                    </CardSubtitle>
                    <CardText>
                      <strong>${p.total.toFixed(2)}</strong>
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total</span>
            <strong>${selectOrder.total.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
