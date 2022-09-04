import React from 'react';
import {Link} from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>Cart is empty 😕</h2>
            <p>
                Maybe you need to add some burgers to the cart.<br/>
                If you want add some burgers to cart, you need to go to the main page
            </p>
            <img src="/img/empty-cart.png" alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Go to the main page</span>
                </Link>
        </div>
    );
};

export default CartEmpty;