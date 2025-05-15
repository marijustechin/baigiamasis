import { useCartStore } from '../stores/cartStore';

export const Cart = () => {
  const { items, totalPrice, addItem, removeItem, updateQuantity } =
    useCartStore();

  const handleAddToCart = () => {
    addItem({ id: '1', name: 'iPhone', price: 999, quantity: 1 });
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} x {item.quantity}
          </p>
          <p>{item.price * item.quantity} €</p>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <hr />
      <p>Total: {totalPrice} €</p>
    </div>
  );
};
