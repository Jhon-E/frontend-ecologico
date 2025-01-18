import { useState, useEffect } from "react";
import apiCategories from "../../services/ApiCategories";

const ListOfCategories = ({ onClick }) => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    apiCategories.getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <ul className="flex w-screen sm:w-max overflow-auto sm:flex-col gap-7 sm:overflow-x-hidden sm:flex-wrap sm:justify-around p-4">
      {categories
        ? categories.map((c) => {
            return (
              <li
                key={c.ID_categoria}
                className="text-center cursor-pointer bg-accent p-2 min-w-max text-base-100 rounded-3xl transition-all h-min hover:scale-110"
                onClick={() => onClick(c.nombre)}
              >
                {c.nombre}
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export default ListOfCategories;
