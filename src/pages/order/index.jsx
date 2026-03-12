import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Button from "../../UI/Button";
import { fetchOrders } from "../../store/orderSlice";
import Loader from "../../components/Loader";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import OrderDocument from "./component/OrderDocument";
import jsPDF from "jspdf";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Your Orders_react-to-print",
    onAfterPrint: () => toast.success("Orders downloaded successfully"),
    onPrintError: () => toast.error("Failed to download orders"),
  });

  const handlePDFDownload = async () => {
    const element = componentRef.current;

    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = doc.internal.pageSize.getWidth();

    try {
      toast.info("Downloading Pdf...");

      await doc.html(element, {
        callback: function (doc) {
          doc.save(`Order_jsPDF`);
          toast.success("Pdf downloaded successfully");
        },
        x: 10,
        y: 10,

        windowWidth: 1200,

        width: pdfWidth - 20,
        autoPaging: "text",

        html2canvas: {
          useCORS: true,
          logging: false,
          letterRendering: true,
          backgroundColor: "#f2e8d5",
        },
      });
    } catch (errr) {
      console.error(errr);
      toast.error("Failed to download");
    }
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleNavigation = () => navigate("/all-products");

  const authUser = useSelector((state) => state.auth?.user);
  const userId = authUser?.id;

  const userOrders = useSelector((state) => state.orders?.userOrders || []);
  const list = useSelector((state) => state.orders?.list || []);
  //   console.log("Order: ", list);

  const { loading, error } = useSelector((state) => state.orders);

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

  if (loading) return <Loader />;
  if (error) return <p className="para">{error.message}</p>;

  return (
    <div className="user-order-page">
      <h2>Order Page</h2>
      <Button onClick={handlePrint}>Download Your Orders</Button>
      {/* <PDFDownloadLink
        document={<OrderDocument orders={combinedOrders} />}
        fileName="orders_react-pdf/renderer.pdf"
        className="btn btn-primary"
      >
        {({ loading }) => (loading ? "Loading..." : "Download Orders")}
      </PDFDownloadLink> */}
      <Button onClick={handlePDFDownload}>Download Orders</Button>
      <div ref={componentRef}>
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
    </div>
  );
}
