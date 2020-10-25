import { NextPage } from "next";
import Page from "../components/pages/ssg";
import { initializeStore } from "../store";

const SSR: NextPage = () => {
  return <Page />;
};

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
  const reduxStore = initializeStore();

  const { dispatch } = reduxStore;

  console.log("getServerSideProps", reduxStore);

  dispatch({
    type: "TICK",
    light: false,
    lastUpdate: Date.now()
  });

  return { props: { initialReduxState: reduxStore.getState() } };
}

export default SSR;
