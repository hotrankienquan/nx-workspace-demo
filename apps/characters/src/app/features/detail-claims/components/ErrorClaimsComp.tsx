import { Alert, Container } from "@mui/material"

const ErrorClaimsComp = () => {
  return (
    <Container maxWidth="lg" sx={{mt:4, mb:4}}>
        <Alert severity="error">
            Fail to load claim form. Please try again later
        </Alert>
    </Container>
  )
}

export default ErrorClaimsComp