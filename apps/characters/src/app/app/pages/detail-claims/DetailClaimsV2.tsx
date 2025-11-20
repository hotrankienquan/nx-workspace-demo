import React from "react";
import { Container, Paper } from "@mui/material";
import Loading from "../../../features/detail-claims/components/Loading";
import ErrorClaimsComp from "../../../features/detail-claims/components/ErrorClaimsComp";
import DetailHeader from "../../../features/detail-claims/components/DetailHeader";
import DetailNavigation from "../../../features/detail-claims/components/DetailNavigation";
import DetailForm from "../../../features/detail-claims/components/DetailForm";
import DetailError from "../../../features/detail-claims/components/DetailError";
import { useDetailClaims } from "../../../features/detail-claims/hooks/useDetailClaims.hooks";
import { DetailClaimsProvider } from "./DetailClaimsProvider";

const DetailClaimPageV2: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { isLoading, configError, formConfig } = useDetailClaims();

    if (isLoading) return <Loading />;

    if (configError || !formConfig?.stages) return <ErrorClaimsComp />;

    return (
        <DetailClaimsProvider>
            <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
                {children ?? (
                    <>
                        <DetailHeader />
                        <DetailNavigation />
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <DetailForm />
                            <DetailError />
                        </Paper>
                    </>
                )}
            </Container>
        </DetailClaimsProvider>
    );
};

export default DetailClaimPageV2;
