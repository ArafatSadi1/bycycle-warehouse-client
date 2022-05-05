import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({product}) => {
    const {name, supplierName, price, about, picture, quantity} = product;
  return (
    <Col sm={12} lg={4}>
      <div className="border border-dark shadow mb-5 rounded-2">
        <Card.Img variant="top" src={picture} />
        <Card.Body>
          <Card.Title className="fs-4 text-start">{name}</Card.Title>
          <Card.Text className="text-start">
            {about}
          </Card.Text>
          <div className="d-flex justify-content-between fw-bold">
              <p>Supplier: {supplierName}</p>
              <p>Available({quantity})</p>
          </div>
          <Card.Text className="text-start fw-bold fs-5">
            <span>$</span>{price}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="m-0 p-0 border-0">
            <Link to='/' className="btn btn-dark w-100 fw-bold fs-5 rounded-2">Update</Link>
        </Card.Footer>
      </div>
    </Col>
  );
};

export default Product;