import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../utils/routes";

const ProfileContainerHeader = ({ show, setShow, user, logout }) => {
  const handleShowProfile = () => {
    setShow(false);
  };

  return (
    <aside
      className={`absolute z-50 bg-white transition-all ${
        show
          ? "w-full top-0 right-0 h-screen sm:w-1/3 sm:h-auto shadow-xl"
          : "top-0 right-0 h-auto hidden sm:w-0 sm:block"
      }`}
    >
      <section className="flex w-full p-6 bg-white">
        <div onClick={handleShowProfile} className="cursor-pointer bg-white">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
        <div className="flex-grow flex justify-center items-center bg-white">
          <b className="text-2xl">Perfil</b>
        </div>
      </section>
      <section className="w-full flex justify-around py-14 items-center sm:bg-white">
        <div className="rounded-full h-28 w-28 bg-slate-200 justify-self-end overflow-hidden cursor-pointer">
          <img
            src={user.avatar}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div>
          <p className="text-2xl">{user.nombre}</p>
          <p className=" text-slate-500">{user.email}</p>
        </div>
      </section>
      <section className="w-full h-full py-8 border-t-slate-200 border-t-2 sm:bg-white">
        <h1 className="text-slate-500 ml-4">General</h1>
        <div className="mt-6 text-lg border-b-2 flex flex-col sm:bg-white">
          <Link
            className="text-bold border-b-slate-200 p-4 cursor-pointer"
            to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.SELL}/`}
          >
            Vender
          </Link>
          {user.rol == 2 ? (
            <Link
              className="text-bold border-b-slate-200 p-4 cursor-pointer"
              to={`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.HOME}/${PRIVATE_ROUTES.SALES}/`}
            >
              Mis productos en venta
            </Link>
          ) : null}
          <span
            className="text-bold text-red-500 border-b-slate-200 border-b-2 p-4 cursor-pointer font-bold"
            onClick={logout}
          >
            Cerrar Sesión
          </span>
        </div>
      </section>
    </aside>
  );
};

export default ProfileContainerHeader;
