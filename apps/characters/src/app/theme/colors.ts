import { PaletteOptions, SimplePaletteColorOptions } from "@mui/material";



const COLOR_PRIMARY:SimplePaletteColorOptions = {
    main:'#80deea'
};


const COLOR_SECONDARY:SimplePaletteColorOptions = {
    main:'#80eac1'
};


// Mui colors set to use in theme.palette

export const PALETTE_COLORS:Partial<PaletteOptions>= {
    primary: COLOR_PRIMARY,
    secondary: COLOR_SECONDARY,
};


