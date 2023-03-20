const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl">
      <table>{children}</table>
    </div>
  );
};

export default Table;
