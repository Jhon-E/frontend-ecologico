const Btn = ({ value, onClick, isDisable }) => {
  return (
    <button
      className="bg-myGreen rounded-lg disabled:bg-green-800 disabled:text-green-950 text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-full h-full"
      onClick={onClick}
      disabled={isDisable}
    >
      {isDisable?"Cargando...":value}
    </button>
  );
};

export default Btn;
