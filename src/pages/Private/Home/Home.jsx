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
import IconUser from "../../../assets/iconUser.png";

// Estilos
import "./styles/homeIndex.css";

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState(null);
  const [filterProducts, setFilterProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");

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
    setCat(categoryName);
    const filtered = products.filter((p) => p.Nombre_cat === categoryName);
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
    <main className="h-dvh w-full max-w-full">
      <Header search={search} setSearch={setSearch} />
      {/* Sección Buscador */}
      <section className="sm:p-32 search-home sm:h-auto sm:justify-center sm:gap-24 sm:max-w flex flex-col gap-6 p-6">
        <article className="sm:text-base-100 sm:top-0 rounded-md mt-20">
          <p className="font-bold">
            Hola <code>{user.nombre || "usuario"}</code>
          </p>
          <h1 className="font-bold text-2xl">¿Qué buscas para hoy?</h1>
        </article>
      </section>
      {/* Sección Productos */}
      <section className="sm:px-32 sm:rounded-none w-full rounded-t-[40px] pb-6">
        {/* Lista Productos  */}
        <div className="sm:overflow-x-hidden sm:gap-14 sm:flex-row flex flex-col mt-3 items-center max-w-full">
          {/* Categorías */}
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-accent sm:self-center sm:text-3xl sm:mb-6 sm:ml-0 ml-6">
              Categorías
            </h3>
            <aside className="w-full overflow-x-hidden">
              <ListOfCategories onClick={handleCategoryClick} />
            </aside>
          </div>
          {/* PRODUCTOS */}
          <div className="flex flex-col w-full gap-2 sm:grid sm:grid-cols-3 sm:gap-3 sm:min-h-full p-6">
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
        {/* Producto Ejemplo */}

        <div className="card card-side bg-base-100 shadow-xl min-h-96 sm:p-0 p-6">
          <figure>
            {products?.[0]?.imagen ? (
              <img
                src={products[0].imagen}
                alt={products[0].nombre}
                className="object-cover h-full rounded-tr-xl rounded-br-xl hover:scale-125 transition-all self-end"
              />
            ) : (
              <p className=" self-center">Sin imagen disponible.</p>
            )}
          </figure>
          <div className="card-body flex justify-between">
            <h2 className="card-title text-5xl font-bold">
              {products[0].nombre}
            </h2>
            <h4 className=" text-4xl font-bold text-success self-start">
              {products[0].precio}
            </h4>
            <div className="card-actions self-end">
              <button className="btn btn-accent">Comprar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <Loading />
  );
}

export default Home;
