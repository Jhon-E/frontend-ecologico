import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./product/${id}`);
  };
  return (
    <div
      className="w-full flex flex-col h-auto sm:w-full sm:cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-28 sm:min-h-44 overflow-hidden">
        <img
          src={image ?? "/ejemplo.png"}
          alt={name}
          className="transition-all hover:scale-125 rounded-xl sm:h-64 h-full w-full object-cover"
        />
      </div>
      <div className=" flex-grow">
        <p>{name}</p>
        <b>{price} $</b>
      </div>
    </div>
  );
};

export default Card;
