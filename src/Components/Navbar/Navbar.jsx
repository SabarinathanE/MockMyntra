import React, { useState } from "react";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { BsHandbag } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchProduct } from "../../Redux/Recducer/ProductReducer";
import { PreLoadCart, PreLoadWishList, navVariables } from "../../Utils";
import { deleteLogin, loginStatus } from "../../Redux/Recducer/LoginReducer";

function Navbar() {
  const dispatcher = useDispatch();
  const navigate = useNavigate()
  const { cart } = useSelector((state) => state.Cart);
  const { wishList } = useSelector((state) => state.WishList);
  const [ searchTerm, setsearchTerm ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatcher(SearchProduct(searchTerm));
  };

  const loggedOut = () => {
    dispatcher(loginStatus(false));
    localStorage.removeItem("isLoggedIn");
    dispatcher(deleteLogin())
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top z-1">
      <div className="container-fluid d-flex">
        <Link className="img-div" to="/">
          <div className="nav-img"></div>
        </Link>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <div className="nav-img"></div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body navbar-list">
            <ul className="navbar-nav justify-content-start align-items-lg-center flex-grow-1 pe-3 gap-3 ms-3 me-0">
              {navVariables.map(
                (category, index) => (
                  <li className="nav-item category" key={index}>
                    <Link
                      to={`/${category.toLowerCase()}`}
                      className="nav-link active"
                      href="#"
                    >
                      {category}
                    </Link>
                  </li>
                )
              )}
            </ul>
            {/* <div className="d-flex justify-content-center me-5">
              <button className="btn">LogOut</button>
            </div> */}

            <form
              className="search-form d-flex align-items-center flex-grow-1 me-4"
              role="search"
              onSubmit={handleSubmit}
            >
              <div className="search-wrapper">
                <IoIosSearch className="search-icon fw-bold fs-4" />
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search for products, brands and more"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="nav-profile fw-bold fs-4 gap-4 me-4">
          <span className="nav-profile-ele">
            <Link>
              <CgProfile style={{ color: "black" }} />
            </Link>
          </span>
          {/* <p>Profile</p> */}
          {wishList.length > 0 ? (
            <span className="nav-profile-ele">
              <Link to="/wishlist" onMouseEnter={PreLoadWishList} className="position-relative">
                <CiHeart style={{ color: "red" }} />
                <span
                  style={{ fontSize: "10px" }}
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {wishList.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
            </span>
          ) : (
            <span className="nav-profile-ele">
              <Link to="/wishlist" onMouseEnter={PreLoadWishList}> 
                <CiHeart style={{ color: "red" }} />
              </Link>
            </span>
          )}

          {/* <p>Wishlist</p> */}
          {cart.length > 0 ? (
            <span className="nav-profile-ele">
              <Link to="/cart" onMouseEnter={PreLoadCart} className="position-relative">
                <BsHandbag style={{ color: "black" }} />
                <span
                  style={{ fontSize: "10px" }}
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {cart.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
            </span>
          ) : (
            <span className="nav-profile-ele">
              <Link to="/cart" onMouseEnter={PreLoadCart}> 
                <BsHandbag style={{ color: "black" }} />
              </Link>
            </span>
          )} 
          {/* <p>Bag</p> */}
        </div>
        <div className="d-flex justify-content-center align-items-center bg-dark rounded-4">
              <button onClick={loggedOut} className="btn-login btn text-primary border-0">LogOut</button>
            </div>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
{
  /* <li className="nav-item">
          <a className="nav-link active" href="#">WOMEN</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">KIDS</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">HOME</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">BEAUTY</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">GENZ</a>
        </li>
        <li className="nav-item">
        <span><sup data-reactid='973' style={{textAlign:'end ! important'}}>super</sup></span>
          <a className="nav-link active" data-reactid='973' href="#">STUDIO</a>
        </li> */
}
