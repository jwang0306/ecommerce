import React from 'react'

import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'

import './CartItem.scss'

const CartItem = (props) => {
    let operation = (
        <>
            <Button to={`/products/${props.id}`} btnType="Default">Detail</Button>
            <Button clicked={props.cartDeleteProduct} btnType="Danger">Del</Button>
        </>
    )
    let cartItem = (
        <Card className="CartItem">
            <h1 className="CartItemTitle">
                {props.title}
            </h1>
            {props.available ? null : <h1>currently unavailable!</h1>}
            <h2 className="CartItemPrice">
                quantity:{props.quantity}
            </h2>
            <h2 className="CartItemPrice">
                total$:{props.price * props.quantity}
            </h2>

            {props.isCheckout ? null : operation}
        </Card>
    )
    return (
        <>
            {cartItem}
        </>
    )
}

export default CartItem