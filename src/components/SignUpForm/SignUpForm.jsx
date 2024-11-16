import Btn from "../Button";
import Input from "../Input";
import {
  faEnvelope,
  faAddressCard,
  faUser,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../utils/routes";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blockBtn, setBlockBtn] = useState(false);
  const fileElem = useRef();

  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleSignUp = async () => {
    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      fileElem.current.files.length > 0
    ) {
      //aca cargo la imagen a cloudinary
      setBlockBtn(true)
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
      const url_avatar = await url_res.json();
      //acá envio a mi backend la info
      signin(name, email, password, url_avatar.secure_url);
      setEmail("");
      setName("");
      setPassword("");
      setBlockBtn(false)
      navigate(PRIVATE_ROUTES.PRIVATE, { replace: true });
    } else {
      alert("Por favor rellene los campos");
    }
  };

  return (
    <form className=" flex flex-col gap-4 w-full">
      <Input
        type="text"
        placeholder="Nombre de usuario"
        icon={faUser}
        value={name}
        setValue={setName}
      />
      <Input
        type="email"
        placeholder="Email"
        icon={faEnvelope}
        value={email}
        setValue={setEmail}
      />
      <Input
        type="password"
        placeholder="Tu contraseña"
        icon={faAddressCard}
        value={password}
        setValue={setPassword}
      />
      <div className="flex flex-row gap-1 bg-white/80 rounded-md items-center p-2 text-black border-gray-500 border-[1px]">
        {faImage ? (
          <FontAwesomeIcon icon={faImage} height={26} width={24} color="gray" />
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
      <Btn
        isDisable={blockBtn}
        value="Registrarse"
        onClick={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      />
      <article className=" self-center">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold self-center mb-4 text-myGreen"
          >
            Inicia sesión aquí.
          </Link>
        </p>
      </article>
    </form>
  );
}
