import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
import FlipMove from 'react-flip-move';

function Checkout() {
  const [{ user, basket }, dispatch] = useStateValue();

  const ticketNotVisibleState = {
    transform: 'translateX(-100%)',
    opacity: 0.1,
  };
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout__ad"
        />
        <div>
          <h3>{user ? `Hello, ${user?.email}` : 'Hello Guest'}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          <FlipMove
            enterAnimation={{
              from: ticketNotVisibleState,
              to: {},
            }}
            leaveAnimation={{
              from: {},
              to: ticketNotVisibleState,
            }}
          >
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                rating={item.rating}
                price={item.price}
                title={item.title}
                image={item.image}
              />
            ))}
          </FlipMove>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
