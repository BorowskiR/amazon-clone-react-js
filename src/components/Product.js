import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({ title, image, rating, price, id }) {
  const [{ basket }, dispatch] = useStateValue();

  console.log('this is the basket >>>', basket);

  const addToBasket = () => {
    //dispatch action to data layer (to reducer)
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((star, index) => (
              <span role="img">⭐</span>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;