import React, { Fragment, useEffect } from "react";
import HeadSection from "./HeadSection";

interface HomeProps {
  selectHome: () => void;
}

function Home(props: HomeProps) {
  const { selectHome } = props;

  useEffect(() => {
    selectHome();
  }, [selectHome]);

  return (
    <Fragment>
      <HeadSection />
    </Fragment>
  );
}

export default Home;
