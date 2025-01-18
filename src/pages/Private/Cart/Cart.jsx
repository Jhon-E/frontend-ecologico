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
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={imagen} alt={nombre} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {nombre}
          <div className="badge badge-secondary">${precio * quantity}</div>
        </h2>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Unidades disponbles {stock}</div>
        </div>
        <div className="card-actions justify-center">
          <div className="flex w-full items-center">
            <small className=" text-lg font-bold w-1/2">
              Cantidad &nbsp;
              <span className=" font-bold text-accent">{quantity}</span>
            </small>
            {quantity < stock ? (
              <div className=" flex gap-4 w-5/6">
                <button className="btn btn-accent w-1/2" onClick={addToCart}>
                  +
                </button>
                <button
                  className="btn btn-accent w-1/2"
                  onClick={removeFromCart}
                >
                  -
                </button>
              </div>
            ) : (
              <div className="flex w-5/6">
                <button
                  className="btn btn-error w-full"
                  onClick={removeFromCart}
                >
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { cart, clearCart, addToCart, removeFromCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleClick = (cart) => {
    const pedido = [...cart, { token }];

    orderApi.submitOrder(pedido).then((res) => {
      if (res.status === 201) {
        navigate(
          `/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.ORDER_PAGE}/`
        );
      }
    });
  };
  return (
    <main className="flex flex-col min-h-dvh p-32">
      <Header />
      <section className="flex flex-wrap gap-6 justify-center">
        {cart.length === 0 ? (
          <div className="absolute top-0 left-0 w-full h-dvh flex justify-center items-center">
            <h1 className="font-bold text-5xl">El carrito está vacío.</h1>
          </div>
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
      </section>
      <footer className="fixed bg-neutral bg-opacity-65 backdrop-filter backdrop-blur-lg w-max bottom-5 p-5 rounded-lg flex gap-4 left-1/2 -translate-x-1/2">
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
