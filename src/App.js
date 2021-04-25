import React, { useState, useEffect } from 'react'
//import Navbar from './components/Navbar/Navbar'
//import Products from './components/Products/Products'
import { Navbar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setorder] = useState({})
    const [errorMessage, seterrorMessage] = useState('')

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);

        setCart(response.cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });

        setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);

        setCart(response.cart);
    }
    
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();

        setCart(response.cart);
    }

    

    const refreshCart = async () => {
        const response = await commerce.cart.refresh();
    
        setCart(response.cart);
    }
    
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setorder(incomingOrder);

            refreshCart();
           
        } catch (error) {
            seterrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();   
    }, []);

    console.log(cart);
    return (
        <Router>
            <Navbar totalItems={cart.total_items} />
            <Switch>
                <Route exact path='/'>
                    <Products products={products} onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path='/cart'>
                    <Cart 
                        cart={cart}
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart} />
                </Route>
                <Route>
                    <Checkout 
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                     />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
