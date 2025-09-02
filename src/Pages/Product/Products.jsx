import React, { useEffect, useState } from "react";
import { MyntraApi } from "../../Components/Axios/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeCategory,
  ChangeProductQuantity,
  SearchProduct,
  StoreProduct,
  sortSelected,
} from "../../Redux/Recducer/ProductReducer";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import "./Products.css";
import {
  DeleteWithList,
  StoreWishList,
} from "../../Redux/Recducer/WishListReducer";
import { AddToCart } from "../../Redux/Recducer/CartReducer";
import { selectVisibleProducts } from "../../Utils";
import Navbar from "../../Components/Navbar/Navbar";

function Products() {
  const categories = ["mens", "womens", "shoes"];

  const toggleCategory = (cat) => {
      dispatcher(ChangeCategory(cat));
  };

  const dispatcher = useDispatch();
  const { SelectedPrice, SelectedCategory } = useSelector((state) => state.Products);
  const { wishList } = useSelector((state) => state.WishList);
  const { cart } = useSelector((state) => state.Cart);
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector((state) => selectVisibleProducts(state));
  console.log("product", products,"category", SelectedCategory);

  useEffect(() => {
    const cartFetch = async () => {
      try {
          const res = await MyntraApi.get("products");
          dispatcher(StoreProduct([...res.data]));
      } catch (error) {
        alert("Error in Fetching");
      }
    };

    cartFetch();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {/* Floating filter button for small screens */}
        <button
          className="filter-toggle-button d-md-none btn btn-light position-fixed"
          style={{ top: "50%", left: "10px", zIndex: 1050 }}
          onClick={() => setShowFilter(true)}
        >
          {"Filter".split("").map((char, index) => (
            <div key={index} className="text-dark fw-bold">
              {char}
            </div>
          ))}
        </button>

        {/* Sidebar for large screens */}
        <div className="sidebar-filter bg-secondary p-3 d-none d-md-block">
          <h4 className="text-light">Filters</h4>
          <input
            className="p-1 border-0 rounded text-dark"
            onChange={(e) => dispatcher(SearchProduct(e.target.value))}
            placeholder="Search"
            type="text"
          />
          <div className="d-flex flex-column row-gap-2 p-0 mt-3 text-light">
            <div className="clear-btn d-flex justify-content-between align-items-center">
              <h6 className="ps-2 mb-0">Sort By Price:</h6>
              <button
                onClick={() => dispatcher(sortSelected({ type: null }))}
                className="border-0 rounded-2 text-secondary"
              >
                Clear
              </button>
            </div>
            <div className="form-check d-flex justify-content-start column-gap-2 ps-2">
              <input
                type="radio"
                name="priceRange"
                id="hightolow"
                checked={SelectedPrice === "hightolow"}
                onClick={() => dispatcher(sortSelected({ type: "hightolow" }))}
                readOnly
              />
              <label htmlFor="hightolow">High-to-Low</label>
            </div>
            <div className="form-check d-flex justify-content-start column-gap-2 ps-2">
              <input
                type="radio"
                name="priceRange"
                id="lowtohigh"
                checked={SelectedPrice === "lowtohigh"}
                onClick={() => dispatcher(sortSelected({ type: "lowtohigh" }))}
                readOnly
              />
              <label htmlFor="lowtohigh">Low-to-High</label>
            </div>
          </div>
          <hr
            style={{
              height: "3px", // thickness
              backgroundColor: "#fff",
              border: "none", // remove default border
            }}
          />
          <div className="d-flex flex-column row-gap-2 p-0 mt-3 mb-2 text-light">
            <div className="clear-btn d-flex justify-content-between align-items-center">
              <h6 className="ps-2 mb-0">Categories:</h6>
              <button
                onClick={() => dispatcher(ChangeCategory('clear'))}
                className="border-0 rounded-2 text-secondary"
              >
                Clears
              </button>
            </div>
          </div>

      {categories.map((cat,index) => (
                 <div key={index} className="d-flex align-items-center ps-2 column-gap-2 text-light mb-2">
          <input
          id={index}
            type="checkbox"
            checked={SelectedCategory.includes(cat)}
            onChange={() => toggleCategory(cat)}
          />
                  <label htmlFor={index} key={cat}>{cat}</label>
          
          </div>
      ))}
        </div>

        {/* Modal-style filter for small screens */}
        {showFilter && (
          <div
            className="filter-modal d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1055 }}
          >
            {" "}
            <div className="bg-white p-4 rounded" style={{ width: "80%" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Filters</h5>
                <button
                  className="btn btn-close"
                  onClick={() => setShowFilter(false)}
                ></button>
              </div>
              <input
                className="form-control"
                onChange={(e) => dispatcher(SearchProduct(e.target.value))}
                placeholder="Search"
                type="text"
              />
              <div className="d-flex flex-column row-gap-2 p-0 mt-3 text-dark">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="ps-2">Sort By Price:</h6>
                  <button
                    onClick={() => dispatcher(sortSelected({ type: null }))}
                    className="ps-2 border-0 rounded-2 text-dark"
                  >
                    Clear
                  </button>
                </div>
                <div className="form-check d-flex justify-content-start column-gap-2 ps-2">
                  <input
                    type="radio"
                    name="priceRange"
                    id="hightolow"
                    checked={SelectedPrice === "hightolow"}
                    onClick={() => {
                      dispatcher(sortSelected({ type: "hightolow" }));
                      setShowFilter(false);
                    }}
                    readOnly
                  />
                  <label htmlFor="hightolow">High-to-Low</label>
                </div>
                <div className="form-check d-flex justify-content-start column-gap-2 ps-2">
                  <input
                    type="radio"
                    name="priceRange"
                    id="lowtohigh"
                    checked={SelectedPrice === "lowtohigh"}
                    onClick={() => {
                      dispatcher(sortSelected({ type: "lowtohigh" }));
                      setShowFilter(false);
                    }}
                    readOnly
                  />
                  <label htmlFor="lowtohigh">Low-to-High</label>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="product-content text-white p-3 z-2">
          <div className="container text-start justify-content-center">
            <div className="row justify-content-sm-center g-3 column-gap-3 justify-content-lg-start">
              {products.map((item, index) => (
                <div
                  key={`${index}-${item.id}`}
                  className="card-size card col-4 p-0"
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
                    <div style={{ cursor: "pointer" }}>
                      {!wishList.find((i) => i.id === item.id) ? (
                        <CiHeart
                          className="fs-4 bg-light rounded-1 shadow"
                          onClick={() => dispatcher(StoreWishList(item))}
                        />
                      ) : (
                        <FaHeart
                          className="fs-5 text-danger"
                          onClick={() => dispatcher(DeleteWithList(item))}
                        />
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{item.brand}</h6>
                    <p className="card-text">{item.name}</p>
                    <p className="card-text card-Rs">
                      Rs. {item.price}{" "}
                      <span style={{ color: "red" }}>
                        ({item.discount}% OFF)
                      </span>
                    </p>
                    {/* <div className="d-grid"> */}

                    <div className="d-grid">
                    {cart.find((i) => i.id === item.id) ? (
                      <button disabled className="btn btn-secondary">
                        Added to Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary add-btn"
                        onClick={() => dispatcher(AddToCart(item))}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
