// filepath: d:\Skola\Vysoka\VAJ\2025s-project-kos0378\React SPA application\src\components\ui\PageNotFound.jsx
import { Paper, Typography, Container, Button } from "@mui/material";
import { useOutletContext, Link } from "react-router-dom";

export default function PageNotFound() {
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
        <Typography variant="h3" sx={{ mb: 2, color: "#ef5350" }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 3, color: "#666" }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#777" }}>
          The page you are looking for does not exist or has been moved.
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
