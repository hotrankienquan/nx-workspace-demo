import { ThemeOptions } from "@mui/material";
import { PALETTE_COLORS } from "./colors";


export const LIGHT_THEME:ThemeOptions = {
    palette:{
        mode:'light',
        ...PALETTE_COLORS
    }
}


export default LIGHT_THEME;
