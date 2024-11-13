import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import auth from "../services/ApiAuth";
const defaultAvatar =
  "https://emojiisland.com/cdn/shop/products/Flushed_Emoji_Icon_5e6ce936-4add-472b-96ba-9082998adcf7_large.png?v=1571606089";

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
        const res = await response.json()
        alert(res.message);
      } else {
        const res = await response.json();
        console.log("epalee", res);
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
        setToken(res.accestToken);
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

      if (response.status === 409) {
        const res = await response.json()
        
        alert(res.message);
      } else {
        const res = await response.json();
        console.log(res);
        localStorage.setItem("token", `${res.token}`);
        localStorage.setItem(
          "user",
          JSON.stringify({
            nombre: res.user.nombre,
            email,
            avatar: res.user.avatar || defaultAvatar,
            rol: res.user.rol,
          })
        );
        setToken(res.token);
        setUser({
          nombre: res.user.nombre,
          email,
          avatar: res.user.avatar || defaultAvatar,
          rol: res.user.rol,
        });
        window.location.replace("http://localhost:5173/mainsystem/home");
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
