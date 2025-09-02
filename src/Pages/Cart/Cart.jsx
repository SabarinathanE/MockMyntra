import React, { useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeQuantity,
  RemoveFromCart,
  removeCart,
  setTotal,
} from "../../Redux/Recducer/CartReducer";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const dispatcher = useDispatch();
  const {
    cart,
    total,
    discount,
    platformCharges,
    grandTotal,
    deliveryCharges,
  } = useSelector((state) => state.Cart);
  const { logos } = useSelector((state) => state.WishList);
  console.log(cart)

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce(
        (acc, item) => acc + parseInt(Number(item.price * item.quantity)),
        0
      );
      const discount = cart.reduce(
        (acc, item) =>
          acc +
          parseInt(Number((item.price * item.discount) / 100) * item.quantity),
        0
      );
      dispatcher(setTotal({ total, discount }));
    }
  }, [cart]);

  const placeOrder = () => {
    navigate('/OrderedPlaced')
    dispatcher(removeCart(cart))
  }

  return (
    <>
    <Navbar />
        <div className="container ">
      {cart.length > 0 ? (
        <div className="row p-4 px-4 p-md-0 cart-flow">
          <div className="col cart border rounded p-3">
            {cart.map((item, index) => (
              <div
                key={index}
                className="card mb-3"
                style={{ maxwidth: "540px" }}
              >
                <div className="row g-0 ">
                  <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4">
                    <img
                    style={{width:'100%'}}
                      src={item.imgURIs[0]}
                      className="img-fluid rounded-start"
                      alt={item.brand}
                    />
                  </div>
                  <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-8">
                    <div className="card-body p-1 px-3">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{item.brand}</h5>
                        <button
                          style={{ background: "#fe386d", color: "#fff" }}
                          className="border-0 rounded-1 btn-hover mb-2"
                          onClick={() => dispatcher(RemoveFromCart(item))}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="card-text">{item.name}</p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Rs. {item.price}{" "}
                          <span style={{ color: "red" }}>
                            ({item.discount}% OFF)
                          </span>
                        </small>
                      </p>
                      <div className="d-flex gap-2 align-items-center">
                        <span className="fw-bold">Qty:</span>
                        <div className="qty-buttons">
                          <button
                            onClick={() =>
                              dispatcher(
                                ChangeQuantity({ type: "DEC", content: item })
                              )
                            }
                          >
                            -
                          </button>
                          <div className="qty-count">{item.quantity}</div>
                          <button
                            onClick={() =>
                              dispatcher(
                                ChangeQuantity({ type: "INC", content: item })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <div className="card cart py-5 border-0">
              <div
                style={{ background: "#fe386d" }}
                className="card-header text-center"
              >
                <h5 className="fw-bold text-light">Cart Summary</h5>
              </div>
              <div className="card-body border d-flex flex-column py-5">
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title">Total MRP</h5>
                    <h5>₹ {total}</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text  fw-bold">Discount on MRP </p>
                    <p>₹ {discount}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text lh-sm fw-bold">Platform Charges </p>
                    <p>₹ {platformCharges}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text lh-sm fw-bold">Delivery Charges </p>
                    <p>₹ {deliveryCharges}</p>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title d-flex justify-content-between">
                      Total Amount
                    </h5>
                    <h5>₹ {grandTotal}</h5>
                  </div>
                </div>
              </div>
              <button
                style={{ background: "#fe386d", cursor: "pointer", border: 'none' }}
                className="card-footer text-light text-center btn-hover"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "calc(100vh - 180px)" }}
          className="container d-flex justify-content-center align-items-center empty-item"
        >
          <img src={logos[0].emptyCart} alt="" />
          {console.log(logos.emptyCart)}
        </div>
      )}
    </div>
    </>
  );
}

export default Cart;
