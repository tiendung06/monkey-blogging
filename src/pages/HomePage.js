import Layout from "../components/layout/Layout";
import HomeNewest from "../module/home/HomeNewest";
import HomeFeature from "../module/home/HomeFeature";
import HomeBanner from "../module/home/HomeBanner";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Monkey Blogging";
  }, []);

  return (
    <Layout>
      <HomeBanner />
      <HomeFeature />
      <HomeNewest />
    </Layout>
  );
};

export default HomePage;
