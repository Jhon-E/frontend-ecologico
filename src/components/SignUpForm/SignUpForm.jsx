import Btn from "../Button";
import Input from "../Input";
import {
  faEnvelope,
  faAddressCard,
  faUser,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../utils/routes";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleSignUp = () => {
    if (email !== "" && password !== "" && name !== "") {
      signin(name, email, password, avatar);
      setEmail("");
      setName("");
      setPassword("");
      setAvatar("");
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
      <Input
        type="text"
        placeholder="Debe ser una URL"
        icon={faImage}
        value={avatar}
        setValue={setAvatar}
      />
      <Btn
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
