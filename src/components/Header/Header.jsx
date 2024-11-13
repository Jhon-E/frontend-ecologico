import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ProfileContainerHeader from "../ProfileContainerHeader";
import LogoLetrasEcoLogico from "../../assets/LogoLetras_ecologico.png";
import useCart from "../../hooks/useCart";
import "./styles/headerIndex.css"
import { PRIVATE_ROUTES } from "../../utils/routes";

const Header = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <header className="header sm:fixed sm:top-0 sm:h-8 sm:flex sm:w-full sm:justify-between sm:py-10 grid grid-cols-[1fr_2fr_1fr] items-center p-2 z-10">
      {/* CARRITO */}
      <section className="cursor-pointer w-min">
        <Link
          to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.CART}/`}
          className="flex items-center justify-center h-full w-full"
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            className="cursor-pointer h-[30px] text-myGreen -left-5 -top-5 z-10 sm:ml-8"
          />
          {cart.length > 0 ? (
            <span className=" sm:top-10 sm:left-[180px] bg-red-600 text-white font-bold text-xs h-[20px] w-[20px] flex justify-center absolute top-11 left-8 items-center rounded-full z-30">
              {cart.length}
            </span>
          ) : null}
        </Link>
      </section>
      {/* LOGO */}
      <div className=" sm:justify-center flex items-center sm:drop-shadow">
        <Link to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/`}>
          <img
            src={LogoLetrasEcoLogico}
            alt="E-cologico"
            className=" sm:w-52 sm:object-cover sm:h-full"
          />
        </Link>
      </div>
      {/* ICONO PERFIL DE USUARIO */}
      <div className="rounded-full justify-self-end w-16 sm:h-auto h-16 border-4 border-green-500 overflow-hidden cursor-pointer z-10"
        onClick={handleClick}
      >
        <img
          src={user.avatar}
          className="h-full w-full object-cover"
        />
      </div>
      {/* CONTAINER PERFIL */}
      <ProfileContainerHeader
        setShow={setShow}
        show={show}
        user={user}
        logout={logout}
      />
    </header>
  );
};

export default Header;
