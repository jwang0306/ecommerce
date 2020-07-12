import React from 'react'

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'

import './Product.scss'

const Product = (props) => {
    let product = (
        <Card className="ProductItem">
            <h1 className="ProductTitle">
                {props.title}
            </h1>
            <img src={props.imageUrl} alt={props.title} />
            <h2 className="ProductPrice">
                ${props.price}
            </h2>
            <p className="ProductDescription">
                {props.description}
            </p>
            <Button to={`/products/${props.id}`} btnType="Success">Detail</Button>
        </Card>
    )
    if (props.isAdmin) {
        product = (
            <Card className="ProductItem">
                <h1 className="ProductTitle">
                    {props.title}
                </h1>
                <img src={props.imageUrl} alt={props.title} />
                <h2 className="ProductPrice">
                    ${props.price}
                </h2>
                <p className="ProductDescription">
                    {props.description}
                </p>
                <Button to={`/products/${props.id}`} btnType="Success">Detail</Button>
                <Button clicked={props.editProduct} btnType="Danger">Edit</Button>
                <Button clicked={props.deleteProduct} btnType="Danger">Delete</Button>
            </Card>
        )
    }
    return (
        <>
            {product}
        </>
    )
}

export default Product