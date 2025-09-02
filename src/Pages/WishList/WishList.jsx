import { useDispatch, useSelector } from "react-redux";
import { IoStarSharp } from "react-icons/io5";
import { DeleteWithList } from "../../Redux/Recducer/WishListReducer";
import { AddToCart } from "../../Redux/Recducer/CartReducer";
import "./WishList.css";
import Navbar from "../../Components/Navbar/Navbar";

function WishList() {
  const dispatcher = useDispatch();
  const { wishList, logos } = useSelector((state) => state.WishList);
  const { cart } = useSelector((state) => state.Cart);

  return (
    <>
      <Navbar />

      {wishList.length > 0 ? (
        <div className="container pb-4">
          <div className="row justify-content-sm-center g-3 column-gap-3 justify-content-lg-start">
            {wishList.map((item, index) => (
              <div
                key={`${index}-${item.id}`}
                className="card col-4 p-0"
                style={{ width: "18rem" }}
              >
                <img
                  src={item.imgURIs[0]}
                  className="card-img-top position-relative"
                  alt={item.name}
                />
                <div className="cardss d-flex position-absolute top-5 w-100 px-2 py-2 ">
                  <div className="flex-grow-1 text-success">
                    <p className="bg-light px-2 rounded-1 shadow">
                      {item.rating} <IoStarSharp className="rating-icon" /> |{" "}
                      {item.reviews}
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{item.brand}</h6>
                  <p className="card-text">{item.name}</p>
                  <p className="card-text card-Rs">
                    Rs. {item.price}{" "}
                    <span style={{ color: "red" }}>({item.discount}% OFF)</span>
                  </p>
                  <div className="d-grid gap-2 d-md-flex justify-content-between">
                    {cart.find((i) => i.id === item.id) ? (
                      <button disabled className="btn btn-secondary">
                        Added to Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary add-btn"
                        onClick={() => dispatcher(AddToCart((item)))}
                      >
                        Add to Cart
                      </button>
                    )}
                    <button
                      className="btn btn-primary add-btn"
                      onClick={() => dispatcher(DeleteWithList(item))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{ height: "calc(100vh - 180px)" }}
          className="container d-flex justify-content-center align-items-center empty-item"
        >
          <img src={logos[0].emptyCart} alt="" />
        </div>
      )}
    </>
  );
}

export default WishList;
