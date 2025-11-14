import { Box, CircularProgress, Container } from "@mui/material"

const Loading = () => {
  return (
    <Container maxWidth="lg" sx={{mt:4, mb:4}}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress />
        </Box>
    </Container>
  )
}

export default Loading