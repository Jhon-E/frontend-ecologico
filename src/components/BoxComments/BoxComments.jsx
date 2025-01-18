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
        .submitComment(
          token,
          parseInt(productId),
          comentario,
          new Date().getTime()
        )
        .then((res) => res);
      if (responseSubmit.ok) {
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
    <section className="px-10 h-auto z-30 flex flex-col gap-6">
      <h1 className="font-semibold">
        {console.log(comments)}
        Comentarios ({comments.length})
      </h1>
      <div className="flex flex-col gap-6">
        {comments.length > 0 && comments ? (
          comments.map((comment, index) => (
            <aside key={index} className="flex flex-col gap-1 bg-neutral-content sm:bg-opacity-5 bg-opacity-20 p-4 rounded-md">
              {/* AVATAR Y NOMBRE Y FECHA */}
              <section className="flex gap-4 items-center h-full w-full">
                <div className="rounded-full h-9 w-9 bg-slate-200 justify-self-end overflow-hidden cursor-pointer">
                  <img
                    src={
                      comment.avatar
                        ? comment.avatar
                        : "https://emojiisland.com/cdn/shop/products/Flushed_Emoji_Icon_5e6ce936-4add-472b-96ba-9082998adcf7_large.png?v=1571606089"
                    }
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-accent">{comment.nombre}</h3>
                  <small className="text-xs opacity-50 font-semibold">
                    {(() => {
                      const fecha = new Date(comment.fecha);
                      return fecha.toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                    })()}
                  </small>
                </div>
              </section>
              {/* CONTENIDO */}
              <p className=" bg-opacity-5 p-2 w-max">{comment.contenido}</p>
            </aside>
          ))
        ) : (
          <h3>Sin comentarios</h3>
        )}
      </div>
      <aside className="flex w-full sm:w-1/2 gap-4 sm:pb-10">
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
