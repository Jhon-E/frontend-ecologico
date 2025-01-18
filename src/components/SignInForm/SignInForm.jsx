import Btn from "../Button";
import Input from "../Input";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { faEnvelope, faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../utils/routes";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login, loading } = useAuth();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && pass !== "") {
      login(email, pass);
      setEmail("");
      setPass("");
    } else {
      alert("Por favor rellene los campos");
    }
  };

  return (
    <form onSubmit={handleSignIn} className=" flex flex-col gap-4 w-full">
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
        value={pass}
        setValue={setPass}
      />
      <Btn value="Iniciar sesión" isDisable={loading} />
      <article className=" self-center">
        <p>
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold self-center mb-4 text-accent"
          >
            Inscribete aquí.
          </Link>
        </p>
      </article>
    </form>
  );
}
