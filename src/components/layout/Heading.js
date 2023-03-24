const Heading = ({ className = "", children }) => {
  return (
    <h2 className={`${className} relative mb-5 text-xl font-semibold`}>
      {children}
    </h2>
  );
};

export default Heading;
