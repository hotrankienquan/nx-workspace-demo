import { Alert } from "@mui/material";
import { useDetailContext } from "../context/ContextHook";

const DetailError: React.FC = () => {
    const { actionSaveStageMutation } = useDetailContext();
    if (!actionSaveStageMutation.isError) return null;
    return (
        <Alert severity="error" sx={{ mt: 2 }}>
            Failed to save data. Please try again.
        </Alert>
    );
};

export default DetailError