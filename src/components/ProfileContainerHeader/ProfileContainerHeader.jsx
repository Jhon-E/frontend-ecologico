import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../utils/routes";

const ProfileContainerHeader = ({ show, setShow, user, logout }) => {
  let styleShow = { top: "0", right: "-100vw", display: "none" };

  if (show) {
    styleShow = { top: "0", right: "0", display: "block", width: "100vw" };
  }
  const handleShowProfile = () => {
    setShow(false);
  };

  return (
    <>
      <aside
        className=" absolute w-full h-full z-10 bg-white transition-all"
        style={styleShow}
      >
        <section className="flex w-full p-6">
          <div onClick={handleShowProfile} className="cursor-pointer">
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </div>
          <div className="flex-grow flex justify-center items-center">
            <b className="text-2xl">Perfil</b>
          </div>
        </section>
        <section className="w-full flex justify-around py-14 items-center">
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
        <section className="w-full h-full py-8 border-t-slate-200 border-t-2">
          <h1 className="text-slate-500 ml-4">General</h1>
          <div className="mt-6 text-lg border-b-2 flex flex-col">
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
            <article
              className="text-bold text-red-500 border-b-slate-200 border-b-2 p-4 cursor-pointer"
              onClick={logout}
            >
              Cerrar Sesión
            </article>
          </div>
        </section>
      </aside>
    </>
  );
};

export default ProfileContainerHeader;
