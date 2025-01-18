import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddToCartBtn from "../../../components/addToCartBtn";
import Header from "../../../components/Header";
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
      <Header />
      <main className="sm:grid sm:mx-32 mb-10 rounded-lg sm:text-neutral-content sm:bg-neutral text-neutral sm:mt-28 mt-16">
        {/* ACA VA EL CARROUSEL */}
        <section
          className="w-full sm:max-h-dvh sm:p-10 sm:flex sm:flex-col sm:gap-10 sm:justify-between"
          suppressHydrationWarning={true}
        >
          <Carrousel
            product={product}
            title={product.nombre}
            price={product.precio}
            images={product.imagen}
            des={product.descripcion}
            infoSeller={seller}
          />
        </section>
        {/* CAJA DE COMENTARIOS*/}
        <BoxComments productId={productId} />
      </main>
    </>
  );
};

export default Product;
