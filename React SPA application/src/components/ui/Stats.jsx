import { Paper, Typography, Container, Button } from "@mui/material";
import { useOutletContext, Link } from "react-router-dom";

export default function Stats() {
  const { accentColor } = useOutletContext();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 4,
          mb: 4,
          bgcolor: "#f9f9f9",
          textAlign: "center",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#666", mb: 4 }}>
          Page not developed yet
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{ mt: 2, bgcolor: accentColor }}
        >
          Go to Home
        </Button>
      </Paper>
    </Container>
  );
}
