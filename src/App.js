import React, {Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {sendCartData, fetchCartData} from './store/cart-actions'
// import {uiActions} from './store/ui-slice'

let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notificaton)

  useEffect(() => {
    dispatch(fetchCartData())
    console.log('hello world')
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(uiActions.showNotification({
    //     status: 'pending',
    //     title: 'sending',
    //     message: 'sending Cart Data'
    //   }))
    //   const response = await fetch('https://react-http-70780-default-rtdb.firebaseio.com/cart.json', {
    //     method: 'PUT',
    //     body: JSON.stringify(cart)
    //   })
      
    //   if (!response.ok) {
    //     throw new Error('sending Cart Data faild')
    //   }

    //   dispatch(uiActions.showNotification({
    //     status: 'success',
    //     title: 'Success...',
    //     message: 'sent Cart Data Successfully'
    //   }))

    // }

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart))
    }

    // sendCartData().catch((error) => {
    //   dispatch(uiActions.showNotification({
    //     status: 'error',
    //     title: 'Error...',
    //     message: 'sending Cart Data Failed'
    //   }))
    // })
  }, [cart, dispatch]);
  
  return (
    <Fragment>
      {notification && (<Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />)}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
