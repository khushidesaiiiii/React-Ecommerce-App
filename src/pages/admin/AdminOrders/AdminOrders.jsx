import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

import {
  clearSelectedOrder,
  fetchOrders,
  selectedOrder,
} from "../../../store/orderSlice";
import { fetchUsers } from "../../../store/userSlice";
import Button from "../../../UI/Button";

export default function AdminOrders() {
  const dispatch = useDispatch();

  const { list, selectOrder, loading, error } = useSelector(
    (state) => state.orders,
  );

  const users = useSelector((state) => state.users?.list);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const enrichedOrders = useMemo(() => {
    if (!list?.length || !users?.length) {
      return [];
    }
    return list?.map((cart) => {
      const userMatch = users?.find((u) => u.id === cart.userId);
      return {
        ...cart,
        fullName: userMatch
          ? `${userMatch.firstName} ${userMatch.lastName}`
          : "User",
      };
    });
  }, [list, users]);

  const statusPaid = useMemo(() => {
    const map = {};
    list.forEach((order) => {
      map[order.id] = ["paid", "completed", "delivered"][
        Math.floor(Math.random() * 3)
      ];
    });
    return map;
  }, [list]);

  const toggleSelectedOrder = (order) => {
    if (selectOrder?.id === order.id) {
      dispatch(clearSelectedOrder());
      return;
    }
    if (selectOrder?.id !== order.id) {
      dispatch(selectedOrder(order));
      return;
    }
    dispatch(selectedOrder(order));
  };

  if (loading) return <p className="para">Loading...</p>;
  if (error) return <p className="para">{error}</p>;

  return (
    <div className={`order-page ${selectOrder ? "active-order" : ""}`}>
      <div className={`order-list ${selectOrder ? "narrowed" : ""}`}>
        <h2>Orders</h2>
        <div className="order-grid-header">
          <span>Order ID</span>
          <span>Name</span>
          <span>User ID</span>
          <span>Items</span>
          <span>Status</span>
          <span style={{ textAlign: "-webkit-right" }}>Total</span>
        </div>
        {enrichedOrders.map((order) => {
          return (
            <div
              key={order.id}
              onClick={() => toggleSelectedOrder(order)}
              className={`order-row ${
                selectOrder?.id === order.id ? "active" : ""
              }`}
            >
              <span className="order-id">#{order.id}</span>
              <span className="order-id">
                {order?.fullName ? order.fullName : "user"}
              </span>
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
            <h2>order #{selectOrder.id}</h2>
            <h3>{selectOrder.fullName}</h3>
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
