import Layout from "../components/layout/Layout";
import HomeNewest from "../module/home/HomeNewest";
import HomeFeature from "../module/home/HomeFeature";
import HomeBanner from "../module/home/HomeBanner";

const HomePage = () => {
  return (
    <Layout>
      <HomeBanner />
      <HomeFeature />
      <HomeNewest />
    </Layout>
  );
};

export default HomePage;
