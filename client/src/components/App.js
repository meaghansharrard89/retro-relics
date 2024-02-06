import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Social from "../pages/Social";
import NavBar from "./NavBar";
import ScrollToTop from "../components/ScrollToTop";
import Login from "./Login";
import Checkout from "../components/Checkout";
import Profile from "../pages/Profile";
import { OrderProvider } from "../components/OrderContext";
import { ChatProvider } from "./ChatContext";
import Chatbot from "../components/Chatbot";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("/check_session")
      .then((r) => r.json())
      .then((u) => setUser(u));
  }, []);

  return (
    <OrderProvider>
      <ChatProvider>
        <Router>
          <NavBar user={user} setUser={setUser} />
          <main>
            <Switch>
              <Route exact path="/">
                <Home user={user} setUser={setUser} />
              </Route>
              <Route exact path="/about">
                <About user={user} setUser={setUser} />
              </Route>
              <Route exact path="/shop">
                <Shop user={user} setUser={setUser} />
              </Route>
              <Route exact path="/social">
                <Social user={user} setUser={setUser} />
              </Route>
              <Route exact path="/cart">
                <Cart user={user} setUser={setUser} />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/checkout">
                <Checkout />
              </Route>
              <Route exact path="/profile">
                <Profile user={user} setUser={setUser} />
              </Route>
              <Route exact path="/chatbot">
                <Chatbot />
              </Route>
            </Switch>
          </main>
        </Router>
      </ChatProvider>
    </OrderProvider>
  );
}

export default App;
