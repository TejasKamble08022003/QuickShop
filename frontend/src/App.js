import React, { useEffect } from 'react'; // Import React and useEffect from react
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails";


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" Component={ProductDetails } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
