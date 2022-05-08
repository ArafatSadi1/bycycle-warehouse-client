import React from "react";
import { Col, Row } from "react-bootstrap";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import Footer from "../shared/Footer/Footer";

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Products></Products>
        <Footer></Footer>
    </div>
  );
};

export default Home;
