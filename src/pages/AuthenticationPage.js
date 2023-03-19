import { NavLink } from "react-router-dom";

const AuthenticationPage = ({ children }) => {
  return (
    <div className="max-w-3xl min-h-screen py-10 mx-auto">
      <div className="spacing">
        <div className="mb-5 text-center">
          <NavLink to="/" className="inline-block">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="w-20" />
          </NavLink>
        </div>
        <h1 className="mb-10 text-2xl font-bold text-center md:mb-12 md:text-3xl lg:mb-16 lg:text-4xl text-primary">
          Monkey Blogging
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthenticationPage;
