import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./product/${id}`);
  };
  return (
    <div
      className="w-[40%] sm:w-full flex-shrink-0 cursor-pointer flex flex-col h-auto justify-between"
      onClick={handleClick}
    >
      <div className="h-20 sm:min-h-44 overflow-hidden">
        <img
          src={image ?? "/ejemplo.png"}
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
