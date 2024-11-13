import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import apiProducts from "../../../services/apiProducts";

// Componentes
import Input from "../../../components/Input";
import Card from "../../../components/Card";
import Header from "../../../components/Header";
import ListOfCategories from "../../../components/ListOfCategories";
import Loading from "../../../components/Loading";

// Iconos e imágenes
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconUser from "../../../assets/iconUser.png";

// Estilos
import "./styles/homeIndex.css";

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState(null);
  const [filterProducts, setFilterProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("")

  // Fetch de productos
  useEffect(() => {
    apiProducts
      .getProducts()
      .then((data) => data.json())
      .then((res) => {
        const reversedProducts = res.reverse();
        setProducts(reversedProducts);
        setFilterProducts(reversedProducts);
      });
  }, []);

  // Filtrado por categoría
  const handleCategoryClick = (categoryName) => {
    setCat(categoryName)
    const filtered = products.filter(
      (p) => p.Nombre_cat === categoryName
    );
    setFilterProducts(filtered || null);
  };

  // Filtrado por búsqueda
  useEffect(() => {
    if (products) {
      const filtered = products.filter((p) => {
        const productName = p.nombre.toLowerCase();
        const searchQuery = search.toLowerCase();

        return searchQuery
          .split("")
          .every((char) => productName.includes(char));
      });
      setFilterProducts(filtered || null);
    }
  }, [search, products]);

  return products ? (
    <main className="h-dvh w-full">
      <Header avatar={user?.avatar || IconUser} user={user} />
      {/* Sección Buscador */ }
      <section className="sm:p-32 search-home sm:h-screen sm:justify-center sm:gap-24 sm:max-w flex flex-col gap-6 p-6">
        <article className="sm:text-white rounded-md">
          <p className="font-bold">
            Hola <code>{user.nombre || "usuario"}</code>
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

      {/* Sección Productos */}
      <section className="sm:px-32 sm:rounded-none p-6 bg-slate-100 w-full rounded-t-[40px]">
        {/* Categorías */}
        <div className="flex flex-col">
          <h3 className="font-bold text-xl text-myGreen sm:self-center sm:text-3xl sm:mb-6">
            Categorías
          </h3>
          <aside className="w-full">
            <ListOfCategories onClick={handleCategoryClick} />
          </aside>
        </div>

        {/* Producto Ejemplo */}
        <div className="sm:p-0 bg-slate-200 flex justify-between items-evenly rounded-xl sm:h-72 sm:min-h-min mt-4 mb-4">
          <div className="flex flex-col justify-between w-1/2 sm:w-full sm:p-12 p-2">
            {products?.[0] ? (
              <>
                <p className="font-bold text-2xl">{products[0].nombre}</p>
                <b className="text-myGreen text-3xl">{products[0].precio} $</b>
                <Link
                  to={`product/${products[0].ID_producto}`}
                  className="text-myGreen font-bold text-lg mt-7 sm:mt-0 hover:bg-myGreen hover:text-white sm:max-w-min sm:p-2 sm:rounded-xl transition-all"
                >
                  Comprar
                </Link>
              </>
            ) : (
              <p>Sin productos a mostrar.</p>
            )}
          </div>
          <div className="w-1/2 flex justify-end overflow-hidden">
            {products?.[0]?.imagen ? (
              <img
                src={products[0].imagen}
                alt={products[0].nombre}
                className="object-cover h-full rounded-tr-xl rounded-br-xl hover:scale-125 transition-all self-end"
              />
            ) : (
              <p className=" self-center">Sin imagen disponible.</p>
            )}
          </div>
        </div>

        {/* Productos Destacados */}
        <aside className="dest-pro-cont w-full flex justify-between">
          <p className="sm:text-3xl sm:text-myGreen sm:m-8 font-bold text-lg">
            Productos en {cat? cat: "Destacados"}
          </p>
        </aside>
        {/* Lista Productos  */}
        <div className="sm:overflow-x-hidden sm:flex-wrap sm:gap-14 flex mt-3 items-center">
          <div className="grid grid-cols-2 w-full gap-2 sm:grid sm:grid-cols-4 sm:gap-3 sm:min-h-full">
            {filterProducts?.length ? (
              filterProducts.map((product) => (
                <Card
                  key={product.ID_producto}
                  id={product.ID_producto}
                  name={product.nombre}
                  price={product.precio}
                  image={product.imagen}
                />
              ))
            ) : (
              <span className="text-myGreen font-bold text-xl">
                Aún no hay productos con estas características🪴
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  ) : (
    <Loading />
  );
}

export default Home;
