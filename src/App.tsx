import { useState } from 'react'
import './App.css'

import {useQuery} from 'react-query'

// mui
import {Drawer,LinearProgress,Grid,Badge} from '@material-ui/core' 

// mui icons
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

// styles
import {Wrapper} from './App.styles'

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

const getProducts = async(): Promise <CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {

  const {data,isLoading,error} = useQuery<CartItemType[]>('products',getProducts)
  console.log(data,isLoading,error)

  return (
    <div className="App">
     Hello World!
    </div>
  )
}

export default App
