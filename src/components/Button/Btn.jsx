const Btn = ({ value, onClick }) => {
  return (
    <button
      className=" bg-myGreen rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-full h-full"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Btn;
