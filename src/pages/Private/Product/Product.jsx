import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import Carrousel from "../../../components/Carrousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import apiProducts from "../../../services/apiProducts";
import BoxComments from "../../../components/BoxComments/BoxComments";

const Product = () => {
  const { productId } = useParams();
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});

  useEffect(() => {
    apiProducts
      .getProduct(parseInt(productId))
      .then((pro) => pro.json())
      .then((res) => {
        setProduct(res.product[0]);
        setSeller(res.seller[0]);
      });
  }, []);

  const checkProductInCart = (product) => {
    return cart.some((item) => item.ID_producto === product.ID_producto);
  };

  return (
    <>
      <header className="flex justify-between p-8 overflow-x-hidden">
        <div onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" className=" cursor-pointer"/>
        </div>
      </header>
      <section className=" p-6 sm:p-10 ">
        <b className=" text-2xl text-myGreen">{product.precio} COP</b>
        <h1 className=" text-4xl font-bold">{product.nombre}</h1>
      </section>
      <main className="bg-white sm:grid sm:grid-cols-2 sm:h-full">
        {/* ACA VA EL CARROUSEL */}
        <section className="h-2/4 sm:h-full w-full" suppressHydrationWarning={true}>
          <Carrousel
            title={product.nombre}
            images={product.imagen}
            des={product.descripcion}
            infoSeller={seller}
          />
        </section>
        {/* CAJA DE COMENTARIOS*/}
        <BoxComments productId={productId} />
      </main>
      <Footer
        isProductInCart={checkProductInCart(product)}
        onClick={() => {
          checkProductInCart(product)
            ? removeFromCart(product)
            : addToCart(product);
        }}
      />
    </>
  );
};

export default Product;
