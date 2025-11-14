import { useParams } from "react-router-dom";
import ClaimsDetailPage from "./ClaimsDetailPage";


function ClaimsDetailPageWrapper() {
    const { id } = useParams<{ id: string }>();
    return <ClaimsDetailPage claimId={id!} />;
}

export default ClaimsDetailPageWrapper;
