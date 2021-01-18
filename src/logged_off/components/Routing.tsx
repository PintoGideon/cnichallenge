import React from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/PropsRoute";
import Home from "./home/Home";
import About from "./about/About";

export interface RoutingProps {
  selectHome: () => void;
  selectAbout: () => void;
  selectContainerize: () => void;
}

function Routing(props: RoutingProps) {
  const { selectHome, selectAbout, selectContainerize } = props;
  return (
    <Switch>
      <PropsRoute
        exact
        path="/about"
        component={About}
        selectAbout={selectAbout}
      />
      {/*
         <PropsRoute
        exact
        path="/containerize"
        component={Blog}
        selectContainerize={selectContainerize}
      />
      */}

      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

export default Routing;
