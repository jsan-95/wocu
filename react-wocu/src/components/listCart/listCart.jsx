import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { fetchCart } from '../../redux/app';
import { CartItem } from '../cartItem/cartItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function ListCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "http://127.0.0.1:5000/get_cart";

    fetch(url).then((response) => {
        return response.status === 200 ?
            response.json() :
            response.text().then((error) => Promise.reject(error))
    }
    ).then(
        (cart) => dispatch(fetchCart(cart))
    ).catch(
        (error) => console.log(error)
    );
  }, []);

  const cart = useSelector((state) => state.app.cart);
  const productsQty = Object.keys(cart).map(product => cart[product]);
  const totalProducts = productsQty.reduce(
    (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
    0
  );
  
  return (
    <div id="cart">
      <Container >
        <h3>Hay un total de {totalProducts} productos en el carrito</h3>
        <Row>          
        {
          Object.keys(cart).map(product => 
            (<Col key={product} xs="3" className="mt-2 mb-2">
              <CartItem product={product} qty={cart[product]}></CartItem>
            </Col>
            )
          )
        }
        </Row>
      </Container>
    </div>
  );
}
