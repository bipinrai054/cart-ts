import { useState } from 'react'
import './App.css'

import {useQuery} from 'react-query'

// mui
import {Drawer,LinearProgress,Grid,Badge} from '@material-ui/core' 

// mui icons
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

// styles
import {Wrapper,StyledButton} from './App.styles'

// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
  amount: number;
}

// components
import Item from './items/Item'
import Cart from './cart/Cart'


const getProducts = async(): Promise <CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const {data,isLoading,error} = useQuery<CartItemType[]>('products',getProducts)
  
  const getTotalItems = (items: CartItemType[]) => items.reduce((acc:number, item)=>acc+item.amount,0)

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if(isLoading) return <LinearProgress />
  if(error) return <>Something's wrong</>

  return (
    <Wrapper>
      <Drawer 
        anchor="right" 
        open={cartOpen} 
        onClose={()=>setCartOpen(false)}
        >
        <Cart cartItems={cartItems}  addToCart={handleAddToCart}  removeFromCart={handleRemoveFromCart} />
        </Drawer>
        <StyledButton onClick={()=>setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error' >
            <AddShoppingCartIcon/>
          </Badge>
        </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item=>(
            <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  )
}

export default App
