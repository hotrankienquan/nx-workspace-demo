import { createTheme, CssBaseline, InitColorSchemeScript, responsiveFontSizes } from "@mui/material";
import DARK_THEME from "./dark";
import LIGHT_THEME from "./light";
import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import useDarkMode from "../globals/hooks/useDarkMode";

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const COLOR_SCHEMA_SELECTOR = 'class';

function getThemeForLightAndDarkMode() {
    const themeWithCssVariables = createTheme({
        colorSchemes: {
            dark: DARK_THEME,
            light: LIGHT_THEME
        },
        cssVariables: {
            colorSchemeSelector: COLOR_SCHEMA_SELECTOR
        }
    });

    const responsiveTheme = responsiveFontSizes(themeWithCssVariables);

    return responsiveTheme;
}



const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
    children
}) => {
    const { muiMode } = useDarkMode();

    const dualModeTheme = useMemo(() => getThemeForLightAndDarkMode(), []);

    return (<MuiThemeProvider
        noSsr
        theme={dualModeTheme}
        defaultMode={muiMode}
    >
        <InitColorSchemeScript
            attribute={COLOR_SCHEMA_SELECTOR}
            defaultMode={muiMode}

        />
        <CssBaseline enableColorScheme />
        {children}
    </MuiThemeProvider>)
}

export default ThemeProvider;
