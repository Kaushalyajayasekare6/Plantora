
//--------------------------------------------------------------------------------------------------------------------------



import { formatLKR } from "../utils/money";
import QtyInput from "./QtyInput";
import { useCart } from "../context/CartContext";

export default function CartItemRow({ item }) {
  const { increment, decrement, remove } = useCart();

  return (
    <tr className="cart-row">
      <td className="cart-row__remove">
        <button
          type="button"
          className="remove-btn"
          title="Remove item"
          onClick={() => remove(item.id)}
        >
          ×
        </button>
      </td>

      <td className="cart-row__image">
        <img src={item.img} alt={item.title} />
      </td>

      <td className="cart-row__title">{item.title}</td>
      <td className="cart-row__price">{formatLKR(item.price)}</td>

      <td className="cart-row__qty">
        <QtyInput
          value={item.qty}
          onDecrement={() => decrement(item.id)}
          onIncrement={() => increment(item.id)}
        />
      </td>

      <td className="cart-row__total">{formatLKR(item.price * item.qty)}</td>
    </tr>
  );
}
