import React from "react";
import "./OrderedPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderedPage() {
  const { ShippedCart, total } = useSelector((state) => state.Cart);
  const {  logos } = useSelector((state) => state.WishList);
console.log(ShippedCart)
  return (
    <>
      <Navbar />
      {(ShippedCart.length === 0 || !ShippedCart) ? 
              <div
              style={{ height: "calc(100vh - 180px)" }}
              className="container d-flex justify-content-center align-items-center empty-item"
            >
              <img src={logos[0].emptyCart} alt="" />
            </div> : 
            <div className="d-flex flex-column justify-content-start align-items-center">
            <div className="Ordered-Product p-3 border-secondary rounded-3 mb-3">
              <div className="text-center" style={{ minWidth: "440px" }}>
                <h3 className="m-0" style={{ color: "#fe386d" }}>
                  THANK YOU FOR THE ORDER !
                </h3>
                <p className="m-0 p-0">You can See the Orders in <span style={{color: 'orange'}}><Link to='/orderHistory'>History Page</Link></span></p>
                <p className="m-0 p-0">Return to <span style={{color: 'orange'}}><Link to='/'>Home Page</Link></span></p>
              </div>
            </div>
            <div className="Ordered-Product p-3 border-secondary background-light rounded-3 mb-3">
              {ShippedCart.map((item, index) => (
                <div
                  key={index}
                  className="card mb-3"
                  style={{ maxWidth: "440px" }}
                >
                  <div className="row g-0">
                    <div className="col-md-2">
                      <img
                        src={item.imgURIs[0]}
                        className="img-fluid rounded-start"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <p className="card-title fw-bold">{item.brand}</p>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <p className="card-text m-0 p-0">{item.name}</p>
                          <p className="card-text m-0 p-0 fw-bold">
                            ₹ {item.price * item.quantity}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text m-0 p-0">Qty: {item.quantity}</p>
                          <p
                            className="card-text fw-bold"
                            style={{ color: "rgb(229, 144, 70)" }}
                          >
                            Ready to Ship
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <div className="total-shipping d-flex justify-content-between align-items-center">
                  <p className="border rounded-circle p-3">Total Order Price</p>
                  <p className="border rounded-circle p-3">₹ {total}</p>
                </div>
                <p>
                  Items in your order may ship separately. <br></br>
                  View your order for shipping updates.
                </p>
              </div>
            </div>
            <div className="Ordered-Product p-3 border-secondary rounded-3 mb-3">
              <div
                className="text-center"
                style={{ minWidth: "440px", color: "#fe386d" }}
              >
                <h4 className="m-0 mb-3">Questions? We're on call.</h4>
                <div className="mb-3">
                  <h6>Monday to Friday 9am - 9pm</h6>
                  <h6>Saturday to Sunday 10am - 6pm</h6>
                </div>
                <h6 className="m-0">test@email.com</h6>
              </div>
            </div>
          </div>
      }

    </>
  );
}

export default OrderedPage;
