import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1A1A1A",
        color: "#fff",
        py: 4,
        mt: 4,
        borderTop: "1px solid #333",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  borderBottom: `2px solid ${props.accentColor}`,
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                <FitnessCenterIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                About the App
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                This application is developed as a part of the 2025s VAJ
                project. The app helps users track workouts and monitor fitness
                progress.
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  borderBottom: `2px solid  ${props.accentColor}`,
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                <InfoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Technology
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                Built using React and Material-UI
                <br />
                Responsive design for all devices
                <br />
                Database powered by Express.js
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  borderBottom: `2px solid  ${props.accentColor}`,
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                Links
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  aria-label="github"
                  component={Link}
                  to="https://github.com/kostelnikp"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: `${props.accentColor}`,
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid #333",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Workout Tracker | Peter Kostelník,
            KOS0378
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
