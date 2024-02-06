import React from "react";
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
import { UserProvider } from "./UserContext";
import Chatbot from "../components/Chatbot";

function App() {
  return (
    <UserProvider>
      <OrderProvider>
        <ChatProvider>
          <Router>
            <NavBar />
            <main>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/shop">
                  <Shop />
                </Route>
                <Route exact path="/social">
                  <Social />
                </Route>
                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/checkout">
                  <Checkout />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/chatbot">
                  <Chatbot />
                </Route>
              </Switch>
            </main>
          </Router>
        </ChatProvider>
      </OrderProvider>
    </UserProvider>
  );
}

export default App;
