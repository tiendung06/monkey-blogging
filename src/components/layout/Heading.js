const Heading = ({ className = "", children }) => {
  return (
    <h2 className={`${className} relative mb-5 text-xl font-semibold lg:mb-8`}>
      {children}
    </h2>
  );
};

export default Heading;
