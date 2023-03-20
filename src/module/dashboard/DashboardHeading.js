const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <h1 className="mb-1 text-xl font-bold text-black lg:text-2xl">
          {title}
        </h1>
        <p className="text-sm text-gray80">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
