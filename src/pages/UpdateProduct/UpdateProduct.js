import React, { useEffect, useState } from "react";
import { Button, Col, Container, FormControl, FormLabel, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [soldOut, setSoldOut] = useState("");
  const [increaseQty, setIncreaseQty] = useState(0)
  useEffect(() => {
    const url = `http://localhost:5000/product/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [product]);

  const handleDelivered = (product) => {
    const { quantity, ...rest } = product;
    const newQty = quantity - 1;
    console.log(newQty);
    if (newQty >= 1) {
      const updatedProduct = { quantity: newQty, ...rest };

      const url = `http://localhost:5000/product/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((res) => res.json())
        .then((updatedData) => setProduct(updatedData));
    }
    else{
        setSoldOut("Sold Out");
    }
  };
  const getIncreaseQuantity = event =>{
    setIncreaseQty(event.target.value)
    event.target.value = "";
  }
  const handleIncreaseQuantity = () =>{
      const { quantity, ...rest } = product;
      const newQty = increaseQty;
      if(newQty < quantity){
          return toast('New Quantity must be more than Old Quantity')
      }
        const updatedProduct = { quantity: newQty, ...rest };
        const url = `http://localhost:5000/product/${id}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        })
          .then((res) => res.json())
          .then((updatedData) => setProduct(updatedData));
  }
  return (
    <Container className="my-5">
      <Row>
        <Col lg={6}>
          <img className="w-100" src={product.picture} alt="" />
        </Col>
        <Col lg={6}>
          <div>
            <h4 className="fw-bold mb-5">{product.name}</h4>
            <p>
              <span className="fw-bold">Product Id:</span> {product._id}
            </p>
            <p>
              <span className="fw-bold">Feature:</span> {product.about}
            </p>
            <p>
              <span className="fw-bold">Supplier:</span> {product.supplierName}
            </p>
            {soldOut ? (
              <p className="fw-bold text-success">{soldOut}</p>
            ) : (
              <p>
                <span className="fw-bold">Quantity:</span> {product.quantity}
              </p>
            )}
            <p className="fw-bold">${product.price}</p>
            
            <InputGroup className="mb-3 w-25">
                <FormLabel className="fw-bold">Restock the items</FormLabel>
              <FormControl
                className="border border-success rounded px-2"
                placeholder="Number"
                onBlur={getIncreaseQuantity}
                // aria-label="Recipient's username"
                // aria-describedby="basic-addon2"
              />
              <Button onClick={handleIncreaseQuantity} variant="success">
                Add
              </Button>
            </InputGroup>
            <Button
              disabled={soldOut}
              onClick={() => handleDelivered(product)}
              className="w-100 fw-bold mt-3"
              variant="warning"
            >
              Delivered
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
