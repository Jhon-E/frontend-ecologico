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
      {console.log(products)}
      <main className=" p-6">
        <h1 className="text-2xl font-bold mb-6">Mis productos en venta: </h1>
        <section className="h-auto w-full bg-slate-200 p-2 rounded-lg flex flex-wrap gap-14">
          {products
            ? products.map((pro) => (
                <div className="w-[40%] flex-shrink-0 cursor-pointer flex flex-col h-44 justify-between">
                  <div className="h-20 overflow-hidden">
                    <img
                      src={pro.imagen ?? "/ejemplo.png"}
                      className="transition-all hover:scale-125 rounded-xl h-full w-full object-cover"
                    />
                  </div>
                  <div className=" flex-grow">
                    <p>{pro.nombre}</p>
                    <b>{pro.precio} $</b>
                  </div>
                </div>
              ))
            : null}
        </section>
      </main>
    </>
  );
}
