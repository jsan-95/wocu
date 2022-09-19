import React from 'react';
import Card from 'react-bootstrap/Card';


export function CartItem(props) {
  const {product, qty} = props;


  return (
    <div>
      <Card style={{ width: '10rem' }}>
        <Card.Body>
          <Card.Title>{product}</Card.Title>
          <Card.Text>
            Cantidad: {qty}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
