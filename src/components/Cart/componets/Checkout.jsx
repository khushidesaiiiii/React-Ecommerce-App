import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { clearCart } from "../../../store/cartSlice";
import Button from "../../../UI/Button";
import { addUserOrder } from "../../../store/orderSlice";
import { saveOrders } from "../../../utils/orderStorage";

export default function Checkout({ isOpen, onSucess, toggle }) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.carts.items);
  const authUser = useSelector((state) => state.auth?.user);

  const userId = authUser?.id;

  const [step, setStep] = useState("summary");
  const [address, setAddress] = useState({
    name: "",
    contact: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const totalAmount = (items || []).reduce((sum, item) => sum + item.total, 0);
  const formattedTotal = totalAmount.toFixed(2);

  function handleContinue() {
    setStep("address");
  }

  function handleClose() {
    setStep("summary");
    toggle();
  }

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: [e.target.value] });
  }

  const handleSubmit = (e) => e.preventDefault();

  const navigate = useNavigate();

  function randomId() {
    return Math.floor(Math.random() * 50) + 100;
  }

  const placeOrder = () => {
    if (
      !address.name ||
      !address.contact ||
      !address.city ||
      !address.street ||
      !address.state ||
      !address.country ||
      !address.zip
    ) {
      toast.info("Please fill all the details!");
      return;
    }

    const order = {
      id: randomId(),
      userId,
      products: items,
      total: formattedTotal,
      totalProducts: items.length,
      createdAt: new Date().toISOString(),
      status: "placed",
    };

    // navigate("/", { replace: true });
    toast.success("Order Placed Sucessfully");
    //dispatch(clearCart());

    setStep("receipt");
    //onSucess();
    dispatch(addUserOrder(order));
    saveOrders(userId, order);
  };

  function orderPlacedHandle() {
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
    setStep("summary");
    navigate("/", { replace: true });
    onSucess();
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>
          {step === "receipt" ? "Receipt" : "Checkout"}
        </ModalHeader>
        <ModalBody>
          {step === "summary" && (
            <>
              <h4>Order Summary</h4>
              {items.map((item) => (
                <div key={item.id} className="checkout-item-card">
                  <h5 className="checkout-item-title">{item.title}</h5>
                  <p className="checkout-price">
                    {item.price} x {item.quantity}{" "}
                    <span className="checkout-total">
                      <strong>{item.total}</strong>
                    </span>
                  </p>
                </div>
              ))}
              <hr />
              <h5>Total: ${formattedTotal}</h5>
            </>
          )}
          {step === "address" && (
            <>
              <h4>Shipping Address</h4>
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  required
                  value={address.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                />
                <input
                  name="contact"
                  type="number"
                  required
                  value={address.contact}
                  placeholder="Enter your conatct number"
                  onChange={handleChange}
                />
                <input
                  name="street"
                  type="text"
                  required
                  value={address.street}
                  placeholder="Enter your street name"
                  onChange={handleChange}
                />
                <input
                  name="city"
                  type="text"
                  required
                  value={address.city}
                  placeholder="Enter your city"
                  onChange={handleChange}
                />
                <input
                  name="state"
                  type="text"
                  required
                  value={address.state}
                  placeholder="Enter your state"
                  onChange={handleChange}
                />
                <input
                  name="country"
                  type="text"
                  required
                  value={address.country}
                  placeholder="Enter your country"
                  onChange={handleChange}
                />
                <input
                  name="zip"
                  type="number"
                  required
                  value={address.zip}
                  placeholder="Enter your zip code"
                  onChange={handleChange}
                />
              </form>
            </>
          )}
          {step === "receipt" && (
            <>
              <div className="invoice-card" >
                <div className="invoice-header">
                  <h2>Your Invoice</h2>
                  <span className="invoice-badge">Paid</span>
                </div>

                <p className="invoice-subtext">
                  Thank you{" "}
                  <strong>
                    {authUser?.firstName} {authUser?.lastName}
                  </strong>{" "}
                  for your purchase! Your order has been placed successfully.
                </p>
                <h4 className="invoice-section">User Details</h4>
                <div className="invoice-user-details">
                  <p><span>Customer :</span> <strong>{address.name}</strong></p>
                  <p><span>Shipping Address :</span><strong>{address.street}, {address.city}, {address.state}, {address.country} - {address.zip}</strong> </p>
                  <p><span>Contact :</span><strong>{address.contact}</strong> </p>
                  <p><span>Estimated Delivery : </span><strong>5 Days later</strong></p>
                </div>
                <div className="invoice-section">
                  <h4>Order Details</h4>

                  <div className="invoice-items">
                    {items.map((item) => {
                      return (
                        <div key={item.id} className="invoice-item">
                          <div className="invoice-item-info">
                            <h5>{item.title}</h5>
                            <span>
                              ${item.price} × {item.quantity}
                            </span>
                          </div>
                          <strong>${item.total}</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="invoice-footer">
                  <span>Total Paid</span>
                  <strong>${formattedTotal}</strong>
                </div>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="cart-btns">
            {step === "summary" ? (
              <>
                <Button onClick={handleContinue}>Continue</Button>
                <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </>
            ) : step === "address" ? (
              <>
                <Button onClick={placeOrder}>Place Order</Button>
                <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={orderPlacedHandle}>Continue Shopping</Button>
                {/* <Button color="secondary" onClick={handleClose}>
                  Cancel
                </Button> */}
              </>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
