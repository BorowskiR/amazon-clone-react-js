import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';

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
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
