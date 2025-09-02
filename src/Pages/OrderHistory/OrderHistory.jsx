import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import './OrderHistory.css'
import { useSelector } from 'react-redux';

function OrderHistory() {

  const { ShippedCart } = useSelector((state) => state.Cart);
  const {  logos } = useSelector((state) => state.WishList);

  return (
    <div>
        <Navbar />
        {(ShippedCart.length === 0 || !ShippedCart) ? 
        <div
        style={{ height: "calc(100vh - 180px)" }}
        className="container d-flex justify-content-center align-items-center empty-item"
      >
        <img src={logos[0].emptyCart} alt="" />
      </div> : 
              <div className='container d-flex flex-column justify-content-center align-items-start'>
              <h2 className=''>Your Orders!</h2>
              <table>
                  <thead>
                      <tr style={{background: 'pink'}}>
                          <td>Order Id</td>
                          <td>Product Image</td>
                          <td>Name</td>
                          <td>Price</td>
                      </tr>
                  </thead>
                  <tbody>
                      {ShippedCart.map((item, index) => (
                      <tr key={index}>
                      <td>{item.id}</td>
                      <td>                    
                        <img style={{width: '50px'}}
                          src={item.imgURIs[0]}
                          className="img-fluid rounded-start"
                          alt={item.name}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>₹ {item.price * item.quantity}</td>
                  </tr>
                      ))}
  
                  </tbody>
              </table>
          </div>
      }

    </div>
  )
}

export default OrderHistory