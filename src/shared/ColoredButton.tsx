import React, { memo, ReactNode } from "react";
import {
  Button,
  createMuiTheme,
  MuiThemeProvider,
  WithTheme,
} from "@material-ui/core";

interface ColoredButtonProps extends WithTheme {
  children: ReactNode;
  color: string;
}

function ColoredButton(props: ColoredButtonProps) {
  const { color, children, theme } = props;
  const buttonTheme = createMuiTheme({
    ...theme,
    palette: {
      primary: {
        main: color,
      },
    },
  });
  const buttonProps = (({ color, theme, children, ...o }) => o)(props);
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Button {...buttonProps} color="primary">
        {children}
      </Button>
    </MuiThemeProvider>
  );
}

export default memo(ColoredButton);
