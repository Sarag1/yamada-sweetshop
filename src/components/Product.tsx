import './Products.styles.css'

interface ItemInfo {
    Name: string,
    Description: string,
    Price: string,
    State: string
    Image: string
}

const Product = ( {Name, Description, Price, State, Image}: ItemInfo ) => {

    const HandleaddToCart = () => {
        let cart = sessionStorage.getItem('cart')
        if(cart != null) {
            let cartArray = JSON.parse(cart)
            let product = {
                name: Name,
                price: Price,
            }
            cartArray.push(product)
            sessionStorage.setItem('cart', JSON.stringify(cartArray))
        }
    }

  return (
    <div className='NewMerch-item'>
        <div className="images-preview">
            <img src={Image} alt="merch" />
            <div className="tag">
                <p>{State}</p>
            </div>
        </div>
        <div className="item-info">
            <h3>{Name}</h3>
            <p className='item-desc'>{Description}</p>
            <p className='item-price'>${Price}</p>
        </div>
        <div className="item-btn">
            <button onClick={HandleaddToCart}>Add to cart</button>
        </div>
    </div>
  )
}

export default Product