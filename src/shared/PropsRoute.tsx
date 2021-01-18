import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { PluginListProp } from "../logged_in/components/Main";

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
  selectAbout?: () => void;
  selectContainerize?: () => void;
  path: string;
  user?: string;
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
