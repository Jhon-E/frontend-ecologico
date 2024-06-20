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
      <main className="sm:mt-24 sm:p-10 p-6">
        <h1 className="text-2xl font-bold mb-6 text-myGreen">
          Mis productos en venta{" "}
        </h1>
        <section className="w-full bg-slate-200 p-2 rounded-lg flex flex-wrap gap-14 sm:grid sm:grid-cols-3 sm:grap sm:gap-4">
          {products
            ? products.map((pro) => (
                <div className="w-[40%] sm:w-full cursor-pointer flex flex-col justify-between sm:h-[300px]">
                  <div className="h-20 sm:h-min overflow-hidden">
                    <img
                      src={pro.imagen ?? "/ejemplo.png"}
                      className="transition-all hover:scale-125 rounded-xl h-full w-full object-cover sm:h-full"
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
