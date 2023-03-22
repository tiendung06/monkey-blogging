import Button from "../components/button/Button";
import { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div className="min-h-screen px-5 text-white bg-black center lg:px-10">
      <div className="flex flex-col items-center justify-between max-w-5xl text-center">
        <img
          src="/404.png"
          alt="Not found"
          className="max-w-[150px] lg:max-w-[250px] mb-10"
        />
        <h1 className="mb-5 text-3xl font-bold lg:text-5xl">
          404 - Looks like you're lost.
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-sm lg:text-base">
          Maybe this page used to exist or you just spelled something wrong.
          Chances are your spelled something wrong, so can you double check the
          URL?
        </p>
        <Button to={"/"}>Go back</Button>
      </div>
    </div>
  );
};

export default PageNotFound;
