import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Social from "../pages/Social";
import NavBar from "./NavBar";
import ScrollToTop from "../components/ScrollToTop";
import Login from "./Login";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    fetch("/check_session")
      .then((r) => r.json())
      .then((u) => setUser(u));
  }, []);

  return (
    <Router>
      <NavBar />
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
        </Switch>
      </main>
    </Router>
  );
}

export default App;
