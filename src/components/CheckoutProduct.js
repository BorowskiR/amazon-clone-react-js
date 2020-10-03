import React, { forwardRef } from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

const CheckoutProduct = forwardRef(
  ({ id, image, title, rating, price }, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id,
      });
    };
    return (
      <div className="checkoutProduct" key={id} ref={ref}>
        <img className="checkoutProduct__image" src={image} alt="" />
        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((star, i) => (
                <p>⭐</p>
              ))}
          </div>
          <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
