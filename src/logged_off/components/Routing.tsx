import React from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/PropsRoute";
import Home from "./home/Home";

export interface RoutingProps {
  selectHome: () => void;
}

function Routing(props: RoutingProps) {
  const { selectHome } = props;
  return (
    <Switch>
      <PropsRoute path="/" component={Home} selectHome={selectHome} />
    </Switch>
  );
}

export default Routing;
