import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import LogoLetrasEcoLogico from "../../assets/LogoLetras_ecologico.png";
import useCart from "../../hooks/useCart";
import "./styles/headerIndex.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { PRIVATE_ROUTES } from "../../utils/routes";
import Input from "../Input";
import { useMemo } from "react";

const Header = ({ search, setSearch }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  console.log({cart});

  const calculateTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity,0);
  }, [cart]);

  console.log({calculateTotal});
  
  

  return (
    <div className="navbar sm:my-3 sm:rounded-lg sm:max-w-7xl w-full fixed top-0 left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-40 bg-neutral bg-opacity-65 backdrop-filter backdrop-blur-lg py-4 px-10 text-neutral-content rounded-none">
      <div className="sm:flex-1 sm:block w-full">
        <Link to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/`}>
          <img
            src={LogoLetrasEcoLogico}
            alt="E-cologico"
            className="sm:h-12 h-8 object-cover"
          />
        </Link>
      </div>
      <div className="navbar-center sm:mr-4 hidden sm:flex-1 sm:block">
        <Input
          type="text"
          placeholder="Buscar"
          icon={faSearch}
          value={search}
          setValue={setSearch}
        />
      </div>
      <div className="flex-none sm:flex sm:gap-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.length > 0 ? (
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              ) : null}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow text-neutral"
          >
            <div className="card-body">
              {cart.length > 0 ? (
                <span className="text-lg font-bold">
                  {cart.length} Productos
                </span>
              ) : null}
              <span className="text-info">Subtotal: {calculateTotal}</span>
              <div className="card-actions">
                <Link
                  to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.CART}/`}
                  className="flex items-center justify-center h-full w-full"
                >
                  <button className="btn btn-accent btn-block">
                    Ver carrito
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tú foto de perfil" src={user.avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-neutral"
          >
            <li>
              <Link
                className="text-bold border-b-slate-200 p-4 cursor-pointer justify-between"
                to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.SELL}/`}
              >
                Vender
              </Link>
            </li>
            {user.rol == 2 ? (
              <li>
                <Link
                  className="text-bold border-b-slate-200 p-4 cursor-pointer"
                  to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.SALES}/`}
                >
                  Mis productos en venta
                </Link>
              </li>
            ) : null}
            <li className=" text-error font-bold" onClick={logout}>
              <a>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

/* <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div> */

/*
<section className="cursor-pointer w-min">
<Link
  to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.CART}/`}
  className="flex items-center justify-center h-full w-full"
>
  <FontAwesomeIcon
    icon={faCartShopping}
    className="ic cursor-pointer h-[30px] text-myGreen -left-5 -top-5 z-10 sm:ml-8"
  />
  {cart.length > 0 ? (
    <span className=" sm:top-10 sm:left-[180px] bg-red-600 text-white font-bold text-xs h-[20px] w-[20px] flex justify-center absolute top-11 left-8 items-center rounded-full z-30">
      {cart.length}
    </span>
  ) : null}
</Link>
</section>
<div className=" sm:justify-center flex items-center sm:drop-shadow">
<Link to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/`}>
  <img
    src={LogoLetrasEcoLogico}
    alt="E-cologico"
    className="ic sm:w-52 sm:object-cover sm:h-full"
  />
</Link>
</div>
<div
className="rounded-full justify-self-end w-16 sm:h-auto h-16 border-2 sm:border-white border-myGreen overflow-hidden cursor-pointer z-10"
onClick={handleClick}
>
<img src={user.avatar} className="h-full w-full object-cover" />
</div>
<ProfileContainerHeader
setShow={setShow}
show={show}
user={user}
logout={logout}
/>  */
