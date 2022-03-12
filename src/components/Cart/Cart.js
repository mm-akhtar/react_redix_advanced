import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => 
          <CartItem
            key={item.id}
            item={{ title:item.name, quantity: item.quantity, total: item.totalPrice, price: item.price, id: item.id}}
          />
        )}
      </ul>
      <div><span>TOTAL</span>$ {totalPrice}</div>
    </Card>
  );
};

export default Cart;
