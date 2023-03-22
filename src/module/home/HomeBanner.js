import Button from "../../components/button/Button";

const HomeBanner = () => {
  return (
    <div className="py-10 mb-10 bg-gradient-to-br from-primary to-secondary">
      <div className="spacing">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="max-w-2xl text-white">
            <h1 className="mb-5 text-2xl font-bold lg:text-4xl">
              Monkey Blogging
            </h1>
            <p className="mb-10 text-sm leading-relaxed lg:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium magnam similique accusantium natus esse facilis!
              Quaerat voluptates possimus dolorem officiis pariatur, repellat,
              cupiditate porro, quidem molestiae impedit laudantium neque quo!
            </p>
            <Button
              to="/sign-up"
              kind="secondary"
              className="h-auto p-4 text-sm lg:text-base"
            >
              Get started
            </Button>
          </div>
          <div className="hidden lg:block">
            <img src="/img-banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
