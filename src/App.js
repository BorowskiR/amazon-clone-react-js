import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Login from './components/Login';
import Orders from './components/Orders';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51HYIPUEs3xaL0CLAKxVMqJNhf99eu8pMDlrZeMq9Clzht0IkrufDNLvrNEJ8Ge6nYsiF9uOPiw5MlthPaCzAQv1s00MzEisJwe'
);

function App() {
  const [{}, dispatch] = useStateValue();

  // useEffect odpala sie przy ladowaniu apki
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('USER IS >>>', authUser);
      dispatch({
        type: 'SET_USER',
        user: authUser,
      });
      if (authUser) {
        // the user just logged in / the user was logged in
      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
