import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`./product/${id}`);
  };
  return (
    <div
      className="card bg-base-100 h-96 w-full flex-shrink-0 shadow-xl sm:w-full sm:cursor-pointer"
      onClick={handleClick}
    >
      <figure>
        <img
          src={image ?? "/ejemplo.png"}
          alt={name}
          className="transition-all hover:scale-125 rounded-xl sm:h-64 h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-accent">{price}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
