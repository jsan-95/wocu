from flask import Flask, request
from flask_cors import cross_origin

import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'


def _get_cart_data():
    f = open('data/cart.json')
    data = json.load(f)
    f.close()
    return data


@app.route('/get_cart')
@cross_origin()
def get_cart():
    data = _get_cart_data()
    app.logger.info('Getting cart: %s' % data)

    return data, 200


@app.route('/add_products', methods=['POST'])
@cross_origin()
def add_products():
    if request.method == 'POST':
        cart_data = _get_cart_data()
        new_product = json.loads(request.data)
        app.logger.info('Adding new product to cart: %s' % new_product)
        cart_data[new_product['product']] = int(new_product['quantity'])

        with open("data/cart.json", "w") as outfile:
            outfile.write(json.dumps(cart_data, indent=4))

        return cart_data, 200
