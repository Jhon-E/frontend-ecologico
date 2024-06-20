import { useState, useEffect } from "react";
import Input from "../../../components/Input";
import Card from "../../../components/Card";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/Header";
import ListOfCategories from "../../../components/ListOfCategories";
import Loading from "../../../components/Loading";
import IconUser from "../../../assets/iconUser.png";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import apiProducts from "../../../services/apiProducts";
import "./styles/homeIndex.css";

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState(null);
  const [filterProducts, setFilterProduts] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiProducts
      .getProducts()
      .then((data) => data.json())
      .then((res) => {
        setProducts(res.reverse());
        setFilterProduts(res);
      });
  }, []);

  const handleClick = (nameCategorie) => {
    const filterPro = products.filter(
      (p) => p.nombre_categoria === nameCategorie
    );
    setFilterProduts(filterPro ?? null);
  };

  useEffect(() => {
    if (products) {
      const filterPro = products.filter((p) => {
        const productName = p.nombre.toLowerCase();
        const searchQuery = search.toLowerCase();

        for (let i = 0; i < searchQuery.length; i++) {
          if (!productName.includes(searchQuery[i])) {
            return false;
          }
        }
        return true;
      });

      setFilterProduts(filterPro ?? null);
    }
  }, [search]);

  return (
    <main className=" min-h-full w-full ">
      {products ? (
        <>
          <Header
            avatar={user && user.avatar ? user.avatar : IconUser}
            user={user}
          />
          {/* SECCION BUSCADOR */}
          <section className="sm:p-32 search-home sm:h-screen sm:justify-center sm:gap-24 sm:max-w flex flex-col gap-6 p-6 h-1/3">
            <article className=" sm:text-white rounded-md">
              <p className=" font-bold">
                Hola{" "}
                <code>{user && user.nombre ? user.nombre : "usuario"}</code>
              </p>
              <h1 className="font-bold text-2xl">¿Qué buscas para hoy?</h1>
            </article>
            <Input
              type="text"
              placeholder="Buscar"
              icon={faSearch}
              value={search}
              setValue={setSearch}
            />
          </section>
          {/* //SECCION PRODUCTOS */}
          <section className="sm:px-32 sm:rounded-none p-6 bg-slate-100 h-2/3 w-full rounded-t-[40px]">
            <div className="flex flex-col sm:bg-slate-100">
              <h3 className="font-bold text-xl text-myGreen sm:self-center sm:text-3xl sm:mb-6">
                Categorías
              </h3>
              {/* LISTA DE CATEGORIAS */}
              <aside className="w-full">
                <ListOfCategories onClick={handleClick} />
              </aside>
            </div>
            {/* PRODUCTO EJEMPLO */}
            <div
              className="
                sm:p-0 bg-slate-200 flex justify-between items-evenly rounded-xl sm:h-72 sm:min-h-min mt-4 mb-4"
            >
              <div className="flex flex-col justify-between w-1/2 sm:w-full sm:p-12 p-2">
                {products != null && products ? (
                  <>
                    <p className="font-bold text-2xl">{products[0].nombre}</p>
                    <b className="text-myGreen text-3xl">
                      {products[0].precio} $
                    </b>
                    <Link
                      to={`product/${products[0].ID_producto}`}
                      className="text-myGreen font-bold text-lg mt-7 sm:mt-0 hover:bg-myGreen hover:text-white
                          sm:max-w-min
                          sm:p-2
                          sm:rounded-xl
                          transition-all"
                    >
                      Comprar
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="w-1/2 flex justify-end overflow-hidden">
                {products.length > 0 && products[0].imagen ? (
                  <img
                    src={products[0].imagen}
                    alt={products[0].nombre}
                    className="object-cover h-full rounded-tr-xl rounded-br-xl hover:scale-125 transition-all self-end"
                  />
                ) : (
                  <p>Sin productos a mostrar.</p>
                )}
              </div>
            </div>
            {/* PRODUCTOS DESTACADOS */}
            <aside className="dest-pro-cont w-full flex justify-between h-full">
              <p className="sm:text-3xl sm:text-myGreen sm:m-8 font-bold text-lg">
                Productos destacados
              </p>
              <b className=" sm:hidden">Ver todo</b>
            </aside>
            <div className="sm:overflow-x-hidden sm:flex-wrap sm:gap-14 flex overflow-x-scroll mt-3 items-center">
              <div className="flex sm:grid sm:grid-cols-4 sm:gap-3 gap-6 sm:min-h-full">
                {filterProducts && filterProducts[0] != undefined ? (
                  filterProducts.map((pro) => {
                    return (
                      <Card
                        key={pro.ID_producto}
                        id={pro.ID_producto}
                        name={pro.nombre}
                        price={pro.precio}
                        image={pro.imagen}
                      />
                    );
                  })
                ) : (
                  <span className="text-myGreen font-bold text-xl">
                    Aún no hay productos con estas características🪴
                  </span>
                )}
              </div>
            </div>
          </section>
          <footer className="sm:px-32 h-16 w-full bg-myGreen text-green-900 flex items-center justify-center font-bold text-center">
            App desarrollada por Jhoneiker apoyado de Santiago
          </footer>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default Home;
