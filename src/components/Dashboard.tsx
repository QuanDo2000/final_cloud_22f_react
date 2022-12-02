import { Container, Box, CssBaseline, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Dashboard
        </Typography>
      </Box>
    </Container>
  );
}
