import {
  faPortrait,
  faImage,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import Btn from "../../../components/Button/Btn";
import apiCategories from "../../../services/ApiCategories";
import apiProducts from "../../../services/apiProducts";
import auth from "../../../services/ApiAuth";
import useAuth from "../../../hooks/useAuth";

function SellProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    apiCategories.getCategories().then((res) => setCategorias(res));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    apiProducts.submitProduct(
      name,
      precio,
      stock,
      categoria,
      description,
      image,
      user.nombre,
      user.email
    );
    //ACTUALIZO EL ROL DEL USUARIO
    if (user.rol == 1 && user.rol !== 2) auth.updateRol(2, user.nombre, user.email);
  };

  return (
    <>
      <Header />
      <main className="sm:mt-24 sm:p-10 sm:flex sm:flex-col sm:items-center">
        <h1 className="font-bold text-3xl text-myGreen ml-4">
          Vender mi producto
        </h1>
        <form className=" flex flex-col gap-4 w-full p-6 sm:grid sm:grid-cols-3 sm:grid-rows-3">
          <Input
            type="text"
            placeholder="Ingrese el nombre de su producto"
            icon={faPortrait}
            value={name}
            setValue={setName}
          />
          <Input
            type="text"
            placeholder="Ingresa la descripcion de tu producto"
            icon={faPortrait}
            value={description}
            setValue={setDescription}
          />
          <Input
            type="text"
            placeholder="Ingresa tu imagen, debe ser una url"
            icon={faImage}
            value={image}
            setValue={setImage}
          />
          <Input
            type="number"
            placeholder="Precio de venta"
            icon={faMoneyBill}
            value={precio}
            setValue={setPrecio}
          />
          <Input
            type="number"
            placeholder="Cantidades disponibles"
            icon={faMoneyBill}
            value={stock}
            setValue={setStock}
          />
          <select
            name="listaCategorias"
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias
              ? categorias.map((cat) => {
                  return (
                    <option value={cat.nombre} key={cat.ID_categoria}>
                      {cat.nombre}
                    </option>
                  );
                })
              : "cargando..."}
          </select>
        </form>
        <div className=" sm:w-1/3">
          <Btn value="Publicar" onClick={handleClick} />
        </div>
      </main>
    </>
  );
}
export default SellProduct;
