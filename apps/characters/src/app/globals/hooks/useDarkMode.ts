import { useColorScheme } from "@mui/material";


type DarkMode = 'light' | 'dark';

type DarkModeOrSystem = DarkMode | 'system';


interface DarkModeHookResult {
    isDarkMode: boolean;
    currentMode: DarkModeOrSystem;
    muiMode: DarkModeOrSystem | undefined;
    systemMode: DarkMode | undefined;
    setDarkMode: (newMode: DarkModeOrSystem) => DarkModeOrSystem;
    toggleDarkMode: () => DarkMode;
}

export function useDarkMode(): DarkModeHookResult {
    const {
        mode,
        systemMode,
        setMode
    } = useColorScheme();

    const currentMode = (mode === 'system' ? systemMode : mode) ?? 'light';

    const isDarkMode = currentMode === 'dark';

    const toggleDarkMode = () => {
        const newMode = currentMode === 'dark' ? 'light' : 'dark';

        setDarkMode(newMode);
        return newMode;
    }

    const setDarkMode = (newMode: DarkModeOrSystem): DarkModeOrSystem => {
        setMode(newMode);
        return newMode;
    }

    return {
        isDarkMode,
        currentMode,
        muiMode: mode,
        systemMode,
        setDarkMode,
        toggleDarkMode
    }

}

export default useDarkMode;


