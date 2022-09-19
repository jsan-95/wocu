import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { addProduct, fetchCart } from '../../redux/app'


export function ProductForm() {
  const dispatch = useDispatch();

  const [product, setProduct] = React.useState("");
  const [quantity, setQty] = React.useState(0);
  const [error, setError] = React.useState({});

  const sendProduct = (e) => {
    e.preventDefault();
    const data = {product, quantity};
    let validation = {}

    if (!product.length) {
      validation.product = "Debe añadir un producto";
    }
    if (quantity < 1) {
      validation.qty = "La cantidad debe ser mayor que 0";
    }

    if (validation) {
      setError(validation);
      return;
    }
    
    dispatch(addProduct(data))


    const url = "http://127.0.0.1:5000/add_products";

    axios.post(url, {product, quantity})
    .then(function (response) {
      return response.status === 200 ?
            response.json() :
            response.text().then((error) => Promise.reject(error))
    }
    ).then(
      (cart) => dispatch(fetchCart(cart))
    ).catch(
        (error) => console.log(error)
    );
  }

  return (
    <div id="product-form" className='mb-3'>
      <Container >
        <form onSubmit={(e) => sendProduct(e)}>
          <Row>
            <Col>
              <label>
                Producto: <br/>
                <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
              </label><br/>
              <strong style={{color:'red'}}>{error.product}</strong>
            </Col>
            <Col>
              <label>
                Cantidad: <br/>
                <input type="number" value={quantity} onChange={(e) => setQty(e.target.value)} />
              </label><br />
              <strong style={{color:'red'}}>{error.qty}</strong>
            </Col>
            <Col>
              <Button className='mt-3' type="submit" variant="primary">Añadir al carrito</Button>
            </Col>
          </Row>
          
        </form>
      </Container>
    </div>
  );
}
