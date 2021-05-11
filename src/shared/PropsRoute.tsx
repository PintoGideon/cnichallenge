import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { PluginListProp } from "../logged_in/components/Main";
import { Auth } from "../App";

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
  exact?: boolean;
  user?: Auth;
  selectAbout?: () => void;
  selectContainerize?: () => void;
  path: string;
  selectHome?: () => void;
  selectDashboard?: () => void;
  isPluginSubmitted?: boolean;
  computedList?: PluginListProp[];
  pushMessageToSnackbar?: (message: string) => void;
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
