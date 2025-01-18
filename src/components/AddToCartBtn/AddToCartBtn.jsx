import Btn from "../Button";

const AddToCartBtn = ({ onClick, isProductInCart }) => {
  return (
    <div className=" w-full">
      {isProductInCart ? (
        <Btn value="Eliminar del carrito" onClick={onClick} />
      ) : (
        <Btn value="Añadir al carrito" onClick={onClick} />
      )}
    </div>
  );
};

export default AddToCartBtn;
