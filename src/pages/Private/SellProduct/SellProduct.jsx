import {
  faPortrait,
  faImage,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { useEffect, useState, useRef } from "react";
import Btn from "../../../components/Button/Btn";
import apiCategories from "../../../services/ApiCategories";
import apiProducts from "../../../services/apiProducts";
import auth from "../../../services/ApiAuth";
import useAuth from "../../../hooks/useAuth";

function SellProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [blockBtn, setBlockBtn] = useState(false);
  const [categorias, setCategorias] = useState("");
  const { user } = useAuth();
  const fileElem = useRef();

  useEffect(() => {
    apiCategories.getCategories().then((res) => setCategorias(res));
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    setBlockBtn(true);

    //ACTUALIZO EL ROL DEL USUARIO
    if (user.rol == 1 && user.rol !== 2)
      auth.updateRol(2, user.nombre, user.email);

    let avatar = fileElem.current.files[0];

    const data = new FormData();

    data.append("file", avatar);
    data.append("upload_preset", "preset_eco");

    const url_res = await fetch(
      "https://api.cloudinary.com/v1_1/deipntdhp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    //aca obtengo la respuesta de cloudinary
    const imagen = await url_res.json();

    apiProducts.submitProduct(
      name,
      precio,
      stock,
      categoria,
      description,
      imagen.secure_url,
      user.nombre,
      user.email
    );
    setBlockBtn(false)
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
          <div className="flex flex-row gap-1 bg-white/80 rounded-md items-center p-2 text-black border-gray-500 border-[1px]">
            {faImage ? (
              <FontAwesomeIcon
                icon={faImage}
                height={26}
                width={24}
                color="gray"
              />
            ) : (
              ""
            )}
            <input
              accept="image/"
              className="w-full ml-1 py-2 bg-transparent outline-none"
              type="file"
              ref={fileElem}
            />
          </div>
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
          <Btn value="Publicar" isDisable={blockBtn} onClick={handleClick} />
        </div>
      </main>
    </>
  );
}
export default SellProduct;
