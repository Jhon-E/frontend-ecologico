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
    setBlockBtn(false);
  };

  return (
    <>
      <Header />
      <main className="sm:mt-28 mt-16 sm:mx-32 p-10 sm:rounded-lg sm:bg-neutral flex flex-col items-center gap-6 sm:h-auto h-dvh">
        <h1 className="font-bold text-3xl text-neutral sm:text-neutral-content ml-4 self-start">
          Vender mi producto
        </h1>
        <form className=" flex flex-col gap-4 sm:p-6 sm:w-1/2 text-neutral sm:text-neutral-content sm:h-auto h-full justify-around">
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
          <div className="flex sm:flex-row flex-col w-full gap-2">
            <Input
              type="number"
              placeholder="Precio de venta"
              icon={faMoneyBill}
              value={precio}
              setValue={setPrecio}
            />
            <Input
              type="number"
              placeholder="Disponibles"
              value={stock}
              setValue={setStock}
            />
          </div>
          <select
            name="listaCategorias"
            className="select select-accent w-full"
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
          <input
            accept="image/"
            className="file-input file-input-bordered file-input-accent w-full"
            type="file"
            ref={fileElem}
          />
          <Btn value="Publicar" isDisable={blockBtn} onClick={handleClick} />
        </form>
      </main>
    </>
  );
}
export default SellProduct;
