import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import apiProducts from "../../../services/apiProducts";
import useAuth from "../../../hooks/useAuth";
import Card from "../../../components/Card";
export default function Pro_sales() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiProducts
      .getProductsBySeller(user.nombre, user.email)
      .then((res) => setProducts(res));
  }, []);

  return (
    <>
      <Header />
      <main className="sm:mt-24 sm:px-32 px-6 py-24 w-dvw max-w-full">
        <h1 className="text-4xl font-bold text-neutral mb-6">
          Mis productos en venta
        </h1>
        <section className="w-full rounded-lg flex flex-wrap gap-14 sm:grid sm:grid-cols-3 sm:grap sm:gap-4">
          {products
            ? products.map((pro, i) => (
                <Card
                  key={pro.ID_producto}
                  id={pro.ID_producto}
                  name={pro.nombre}
                  price={pro.precio}
                  image={pro.imagen}
                />
              ))
            : null}
        </section>
      </main>
    </>
  );
}

/* {products
            ? products.map((pro, i) => (
              <Card
              key={pro.ID_producto}
              id={pro.ID_producto}
              name={pro.nombre}
              price={pro.precio}
              image={pro.imagen}
            />
              ))
            : null} */
