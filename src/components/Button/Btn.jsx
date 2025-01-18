const Btn = ({ value, onClick, isDisable }) => {
  return (
    <button className="btn btn-accent" onClick={onClick} disabled={isDisable}>
      {isDisable ? <span className="loading loading-spinner" /> : value}
    </button>
  );
};

export default Btn;
