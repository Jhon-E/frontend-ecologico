import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import auth from "../services/ApiAuth";
const defaultAvatar =
  "https://img.freepik.com/vector-premium/personaje-avatar-moda-icono-hombres-ilustracion-vector-plano-gente-alegre-feliz-marco-redondo-retratos-masculinos-grupo-equipo-adorables-chicos-aislados-sobre-fondo-blanco_275421-286.jpg?w=1380";

export default function useAuth() {
  const { token, setToken, user, setUser } = useContext(AuthContext);

  const signin = async (nombre, email, password, avatar) => {
    try {
      const response = await auth
        .signInService({
          nombre,
          email,
          avatar,
          password,
        })
        .then((res) => res);
      if (response.status === 409) {
        alert("Este usuario ya se encuentra registrado.");
      } else {
        const res = await response.json();
        localStorage.setItem("token", `${res.accestToken}`);
        localStorage.setItem(
          "user",
          JSON.stringify({
            nombre,
            email,
            avatar: avatar || defaultAvatar,
            rol: 1,
          })
        );
        setToken(`${res.accestToken}`);
        setUser({
          nombre,
          email,
          avatar: avatar || defaultAvatar,
          rol: 1,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await auth
        .loginService({ email, password })
        .then((res) => res);

      if (response.status === 404) {
        alert("El usuario no existe, verifique sus credenciales.");
      } else {
        const res = await response.json();
        console.log(res);
        localStorage.setItem("token", `${res.accest_token}`);
        localStorage.setItem(
          "user",
          JSON.stringify({
            nombre: res.nombre,
            email,
            avatar: res.avatar || defaultAvatar,
            rol: res.rol
          })
        );
        setToken(`${res.accest_token}`);
        setUser({
          nombre: res.nombre,
          email,
          avatar: res.avatar || defaultAvatar,
          rol: res.rol
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return {
    login,
    logout,
    signin,
    user,
    token,
  };
}
