import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

const renderMergedProps = (
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>,
  ...rest: any
) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

interface PropsRouteProps {
  path: string;
  selectHome: () => void;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PropsRoute = ({ component, ...rest }: PropsRouteProps) => (
  <Route
    {...rest}
    render={(routeProps) => renderMergedProps(component, routeProps, rest)}
  />
);

export default PropsRoute;
