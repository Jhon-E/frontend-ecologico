import useCart from "../../../hooks/useCart";
import Header from "../../../components/Header";
import Btn from "../../../components/Button";
import orderApi from "../../../services/ApiOrder";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../../utils/routes";

function CartItem({
  nombre,
  precio,
  imagen,
  quantity,
  addToCart,
  removeFromCart,
  stock,
}) {
  return (
    <li className="w-full flex flex-col items-start gap-8 p-6">
      <img className="w-2/3 h-1/3 self-center" src={imagen} alt={nombre} />
      <div className="flex flex-col justify-start">
        <strong>
          {nombre} - ${precio * quantity}
        </strong>
        <p className="text-myGreen">Unidades disponbles {stock}</p>
      </div>

      <footer className="flex justify-around items-center w-full bg-slate-200 p-2 rounded-lg">
        <small className=" text-lg">
          Cantidad: <span className=" font-bold text-myGreen">{quantity}</span>
        </small>
        {quantity < stock ? (
          <>
            <div>
              <Btn onClick={addToCart} value={"+"} />
            </div>
            <div>
              <Btn onClick={removeFromCart} value={"-"} />
            </div>
          </>
        ) : (
          <>
            <div>
              <Btn onClick={removeFromCart} value={"-"} />
            </div>
          </>
        )}
      </footer>
    </li>
  );
}

export default function Cart() {
  const { cart, clearCart, addToCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (cart) => {
    const pedido = [...cart, user.email];
    orderApi.submitOrder(pedido).then((res) => {
      if (res.status === 200) {
        navigate(`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.ORDER_PAGE}/`);
      }
    });
  };
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <ul
        className={`flex justify-center items-center ${
          cart.length === 0 ? "flex-1" : "flex-col gap-y-4"
        }`}
      >
        {cart.length === 0 ? (
          <li className="h-full">No has agregado items en el carrito</li>
        ) : (
          cart.map((product) => (
            <CartItem
              key={product.ID_producto}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))
        )}
      </ul>
      <footer className="flex p-6 gap-x-2">
        <Btn value="Limpiar Carrito" onClick={clearCart} />
        <Btn
          value="Realizar Compra"
          onClick={() => {
            if (cart.length === 0) {
              alert("No tienes productos anadidos en el carrito");
            } else {
              handleClick(cart);
            }
          }}
        />
      </footer>
    </main>
  );
}
