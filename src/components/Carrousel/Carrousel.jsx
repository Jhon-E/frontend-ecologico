import { useState } from "react";

const Carrousel = ({ title, images, des, infoSeller }) => {
  const [resumen, setResumen] = useState(true);
  const [car, setCar] = useState(false);

  const handleRe = () => {
    if (!resumen) setResumen(true);
    setCar(false);
  };
  const handleCar = () => {
    if (!car) setCar(true);
    setResumen(false);
  };

  const RenderImages = () => {
    return (
      <div className="flex justify-center h-80 w-full gap-4">
        <img
          className=" object-cover rounded-2xl h-full"
          src={images}
          alt="producto imagen"
        />
      </div>
    );
  };
  const RenderDes = () => {
    return (
      <div className=" sm:flex sm:flex-col sm:w-full">
        <section className="flex justify-center items-center text-myGreen border-b-2 p-4 sm:justify-center">
          <h1 className=" font-bold text-3xl mb-7">CERTIFICADO 🌟</h1>
        </section>
        <section className=" border-b-2 p-4">
          <h1 className=" font-bold text-2xl mb-7">Descripción</h1>
          <p>{des}</p>
        </section>
        <section className=" bordesm:ml-0 r-b-2 p-4">
          <h1 className=" font-bold text-2xl mb-7">Información del vendedor</h1>
          <ul className=" sm:grid sm:grid-cols-2 sm:text-center sm:gap-3">
            <li className="text-myGreen mb-3">
              <h1 className=" text-2xl font-bold">Nombre del vendedor</h1>
              <p className="sm:ml-0 ml-8 text-xl">{infoSeller.nombre}</p>
            </li>
            <li className=" text-myGreen mb-3">
              <h1 className=" text-2xl font-bold">Reputación</h1>
              <p className="sm:ml-0 ml-8 text-xl">{infoSeller.reputacion == 0?"Sin registros":infoSeller.reputacion}</p>
            </li>
            <li className="text-myGreen">
              <h1 className=" text-2xl font-bold">Ventas</h1>
              <p className="sm:ml-0 ml-8 text-xl">{infoSeller.ventasRealizadas}</p>
            </li>
          </ul>
        </section>
      </div>
    );
  };
  return (
    <>
      <ul className="flex gap-7 overflow-x-scroll items-end justify-evenly sm:overflow-x-hidden">
        <li
          className={`cursor-pointer min-w-max text-black h-min border-b-4 p-1 ${
            resumen ? "border-myGreen" : "border-none"
          }`}
          onClick={handleRe}
        >
          Resumen
        </li>
        <li
          className={`cursor-pointer min-w-max text-black h-min border-b-4 p-1 ${
            car ? "border-myGreen" : "border-none"
          }`}
          onClick={handleCar}
        >
          Características
        </li>
      </ul>
      <section className="flex h-[90%] w-full overflow-x-auto overflow-hidden gap-8 p-6">
        {resumen ? <RenderImages /> : <RenderDes />}
      </section>
    </>
  );
};

export default Carrousel;
