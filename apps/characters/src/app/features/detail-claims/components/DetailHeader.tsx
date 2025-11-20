import { Typography } from "@mui/material";
import { useDetailContext } from "../context/ContextHook";

const DetailHeader: React.FC = () => {
    const { id } = useDetailContext();
    return (
        <>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Claims Detail
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                Claim ID: {id}
            </Typography>
        </>
    );
};

export default DetailHeader;