import Input from "../Input";
import apiComentarios from "../../services/ApiComments";
import { useEffect, useState } from "react";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Btn from "../Button/Btn";

const BoxComments = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    apiComentarios
      .getCommentsByProduct(productId)
      .then((res) => res.json())
      .then((res) => setComments(res));
  }, []);

  const handleMessage = async () => {
    const token = localStorage.getItem("token");

    try {
      const responseSubmit = await apiComentarios
        .submitComment(token, parseInt(productId), comentario)
        .then((res) => res);
      if (responseSubmit.status === 201) {
        setComentario("");
        const responseGet = await apiComentarios
          .getCommentsByProduct(productId)
          .then((res) => res.json());
        setComments(responseGet);
      } else {
        console.log(responseSubmit);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-6 h-auto z-40">
      <h1 className=" text-xl font-semibold mb-4">
        Comentarios ({comments.length})
      </h1>
      <div className="w-full m-0 p-0 pb-4 h-60 flex flex-col gap-4 overflow-y-scroll scroll-smooth mb-2">
        {comments.length > 0 && comments ? (
          comments.map((comment, index) => (
            <aside
              key={index}
              className="grid grid-cols-[1fr_3fr] bg-slate-50 p-4 rounded-lg"
            >
              <section className="flex items-center justify-center h-full w-full">
                <div className="rounded-full w-16 h-16 bg-slate-200 justify-self-end overflow-hidden cursor-pointer">
                  <img
                    src={
                      comment.avatar
                        ? comment.avatar
                        : "https://img.freepik.com/vector-premium/personaje-avatar-moda-icono-hombres-ilustracion-vector-plano-gente-alegre-feliz-marco-redondo-retratos-masculinos-grupo-equipo-adorables-chicos-aislados-sobre-fondo-blanco_275421-286.jpg?w=1380"
                    }
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </section>
              <section className=" flex flex-col">
                <h3 className=" text-xl font-medium text-myGreen mb-2">
                  {comment.nombre}
                </h3>
                <p>{comment.contenido}</p>
                <small className="text-slate-400 self-end">
                  {(() => {
                    const fecha = new Date(comment.fecha);
                    return fecha.toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  })()}
                </small>
              </section>
            </aside>
          ))
        ) : (
          <h3>Sin comentarios</h3>
        )}
      </div>
      <aside className="flex w-full justify-between gap-1">
        <div className="w-9/12">
          <Input
            type="text"
            placeholder="Escribe un comentario..."
            icon={faComment}
            value={comentario}
            setValue={setComentario}
          />
        </div>
        <div className="w-1/4">
          <Btn value="Enviar" onClick={handleMessage} />
        </div>
      </aside>
    </section>
  );
};

export default BoxComments;
