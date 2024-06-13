import Btn from '../Button'

const Footer = ({ onClick, isProductInCart }) => {
  return (
    <footer className="w-full p-8 flex justify-center sticky bottom-0 bg-white">
      <div className=" w-[95%]">
        {
          isProductInCart
            ? <Btn value="Eliminar del carrito" onClick={onClick} />
            : <Btn value="Añadir al carrito" onClick={onClick} />
        }
      </div>
    </footer>
  )
}

export default Footer
