import { openModal } from "../features/modal/modalSlice";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

const CartContainer = () => {
      const dispatch = useDispatch();
      const { cartItems, total, amount } = useSelector((store) => store.cart);

      if (amount < 1) {
            return <section className='cart'>
                  <header>
                        <h2> your bag</h2>
                        <h4 className='empty-cart'> is currenty empty</h4>
                  </header>
            </section>;
      }
      return (<>

            <section className="cart">
                  <header>
                        <h2>
                              Your Bag
                        </h2>
                  </header>
                  <div className="cart-total">
                        {cartItems?.map((cart) => {
                              return <CartItem key={cart.id} {...cart} />;
                        })}
                  </div>
                  <footer>
                        <hr />
                        <div className="cart-total">
                              <h4> Total <span>${total.toFixed(2)}</span></h4>
                        </div>
                        <button className="btn clear-btn"
                              onClick={() => dispatch(openModal())}
                        >
                              clear cart
                        </button>
                  </footer>
            </section>


      </>);
};

export default CartContainer;