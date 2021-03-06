import CartItem  from '../cartItem/CartItem'

// styles
import {Wrapper} from './Cart.styles'

// types
import { CartItemType } from '../App'

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickeItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

 const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {

  const calculateTotal = (items: CartItemType[]) =>  items.reduce((acc,item)=>acc + item.amount * Number(item.price),0 )
  

  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items In Cart.</p>:null}
      {cartItems.map(item=>(
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))} 
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  )
}

export default Cart