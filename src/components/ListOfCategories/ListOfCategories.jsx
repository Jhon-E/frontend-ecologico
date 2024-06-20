import { useState, useEffect } from "react";
import apiCategories from "../../services/ApiCategories";

const ListOfCategories = ({ onClick }) => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    apiCategories.getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <ul className="flex gap-7 sm:overflow-x-hidden sm:flex-wrap sm:justify-around overflow-x-scroll p-4">
      {categories
        ? categories.map((c) => {
            return (
              <li
                key={c.ID_categoria}
                className=" cursor-pointer bg-myGreen p-2 min-w-max text-white rounded-3xl transition-all h-min hover:scale-110"
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
