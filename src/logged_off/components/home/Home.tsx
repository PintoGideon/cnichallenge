import React, { Fragment, useEffect } from "react";
import HeadSection from "./HeadSection";
import InfoSection from "../InfoSection/InfoSection";

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
      <InfoSection />
    </Fragment>
  );
}

export default Home;
