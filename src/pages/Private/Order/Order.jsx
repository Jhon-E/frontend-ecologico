import Header from "../../../components/Header";
import Btn from "../../../components/Button/Btn";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import orderApi from "../../../services/ApiOrder";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { user } = useAuth();
  const [dataOrder, setDataOrder] = useState({});
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    orderApi.getOrder(user.nombre, user.email).then((res) => {
      setDataOrder(res.order);
      setProducts(res.products);
    });
  }, []);

  const handleClick = () => {
    alert("Comprado exitosamente!!!");
    navigate("/home");
  };

  return (
    <>
      <Header />
      <main className="p-6 w-full h-max flex flex-col gap-10 bg-slate-100 sm:mt-16">
        <h1 className=" font-bold text-2xl mb-8">Detalles del pedido</h1>
        <section className="h-[20%] text-xl flex flex-col gap-4">
          <div className=" flex justify-between">
            <h2 className=" font-bold">ID pedido: {dataOrder.ID_pedido}</h2>
            <span className=" p-2 bg-slate-200 rounded-lg text-slate-500 text-sm">
              {(() => {
                const fecha = new Date(dataOrder.fecha);
                return fecha.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              })()}
            </span>
          </div>
          <h3 className=" font-bold">
            Estado: <span className=" text-myGreen">{dataOrder.Estado}</span>
          </h3>
          <div className=" flex gap-8">
            <h1 className="font-bold">Método de pago: </h1>
            <select name="metodo_pago">
              <option value="PSE">PSE</option>
              <option value="payPal">PayPal</option>
              <option value="Google Pay">Google Pay</option>
              <option value="Apple Pay">Apple Pay</option>
            </select>
          </div>
        </section>
        {/* PRODUCTOS DEL PEDIDO */}
        <section className="h-[20%] overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase">
              <tr>
                <th scope="col" className="px-6 py-3 bg-myGreen text-white">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3 bg-myGreen text-white">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-myGreen">
                  Precio unitario
                </th>
              </tr>
            </thead>
            <tbody>
              {/* CADA TR ES UNA FILA */}
              {products.length > 0
                ? products.map((pro) => (
                    <tr
                      key={pro.ID_producto}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                      >
                        {pro.nombre}
                      </th>
                      <td className="px-6 py-4">{pro.cantidad_productos}</td>
                      <td className="px-6 py-4">{pro.precio}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </section>
        <section className="h-[20%] flex flex-col gap-2 text-2xl">
          <h1 className=" font-bold">Total a pagar: </h1>
          <span className=" mb-4">{dataOrder.totalPagar} COP</span>
          <div className=" h-16">
            <Btn value={"Comprar"} onClick={handleClick} />
          </div>
        </section>
      </main>
    </>
  );
}
