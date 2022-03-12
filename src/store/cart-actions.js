import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-70780-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch data');
            }

            const Data = response.json();
            return Data
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
                totalPrice: cartData.totalPrice
            }))
            
        } catch (error) {
            sendCartData().catch((error) => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'fetching Cart Data Failed'
                }))
            })
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch('https://react-http-70780-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                    totalPrice: cart.totalPrice
                })
            })

            if (!response.ok) {
                throw new Error('sending Cart Data faild')
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'sent Cart Data Successfully'
            }))
        } catch (error) {
            sendCartData().catch((error) => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error...',
                    message: 'sending Cart Data Failed'
                }))
            })
        }
    }
}