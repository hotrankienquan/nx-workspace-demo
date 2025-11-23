import { ThemeOptions } from "@mui/material";
import { PALETTE_COLORS } from "./colors";


export const DARK_THEME:ThemeOptions = {
    palette:{
        mode:'dark',
        ...PALETTE_COLORS,
    }
};

export default DARK_THEME;


