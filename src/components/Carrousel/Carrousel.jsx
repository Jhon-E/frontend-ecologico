import AddToCartBtn from "../addToCartBtn";
import useCart from "../../hooks/useCart";

const Carrousel = ({ title, price, images, des, infoSeller, product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.ID_producto === product.ID_producto);
  };

  return (
    <div className="flex sm:flex-row flex-col sm:w-full sm:gap-10 sm:max-h-dvh">
      <div className=" sm:flex sm:flex-col sm:w-1/3 sm:max-w-full sm:border sm:border-accent-content sm:rounded-lg p-10 sm:justify-between h-full sm:gap-4">
        <section className=" flex flex-col gap-4">
          <h1 className=" text-5xl font-bold">{title}</h1>
          <h2 className=" text-4xl font-bold text-accent">{price} $</h2>
          <h3 className=" font-bold text-2xl">Descripción del producto</h3>
          <p>{des}</p>
        </section>
        {/* INFO SELLER */}
        <section>
          <h3 className=" font-bold text-2xl sm:mb-7 text-accent">
            Información del vendedor
          </h3>
          <ul className="sm:gap-3 sm:flex sm:flex-wrap">
            <li className=" mb-3">
              <h1 className=" text-xl font-bold">Nombre</h1>
              <p className="">{infoSeller.nombre}</p>
            </li>
            <li className="  mb-3">
              <h1 className=" text-xl font-bold">Reputación</h1>
              <p className="">
                {infoSeller.reputacion == 0
                  ? "Sin registros"
                  : infoSeller.reputacion}
              </p>
            </li>
            <li className="">
              <h1 className=" text-xl font-bold">Ventas</h1>
              <p className="">{infoSeller.ventasRealizadas}</p>
            </li>
          </ul>
        </section>
        <AddToCartBtn
          isProductInCart={checkProductInCart(product)}
          onClick={() => {
            checkProductInCart(product)
              ? removeFromCart(product)
              : addToCart(product);
          }}
        />
      </div>
      <div className=" sm:w-2/3 sm:h-full flex justify-center items-center">
        <img
          className=" object-cover rounded-2xl h-full"
          src={images}
          alt="producto imagen"
        />
      </div>
    </div>
  );
};

export default Carrousel;
