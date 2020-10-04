import React, { useState, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import './Payment.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from './axios';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect- jezeli zmieni sie koszyk to robimy request i aktualizujemy stripeSecret - ktory pozwoli nam obciazyc klienta
  useEffect(() => {
    // tworzymy sekretne zakupy klienta, ktore pozwalaja nam go obciążyć
    // jezeli koszyk sie zmieni robimy to ponownie

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // stripe expect the total in currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      // dane z backendu
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log('THE SECRET IS >>>> ', clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // clientSecret - mowi nam na ile obciazyc klienta
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET',
        });

        //przekierowujemy uzytkownika dalej
        history.replace('./orders');
      });
    //paymentIntent = payment confirmation
  };

  const handleChange = (e) => {
    // listen for changes in the card element
    // display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Street</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
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
          </div>
        </div>
        {/* Payment section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy now'}</span>
                </button>
              </div>

              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
