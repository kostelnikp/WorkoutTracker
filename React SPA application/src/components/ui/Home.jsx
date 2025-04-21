import HomeBackground from "../../assets/Home.jpg";
import UserImage from "../../assets/UserImage.svg";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${HomeBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            textAlign: "center",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{ color: "#fff", fontSize: "3em", fontWeight: "bold" }}
          >
            Welcome to the Workout Tracker
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: "#fff", fontSize: "1.5em", mt: 2 }}
          >
            Your personal fitness companion
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#fff", fontSize: "1.2em", mt: 1 }}
          >
            Track your workouts, monitor your progress, and achieve your fitness
            goals.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Card sx={{ maxWidth: 450, borderRadius: "10px" }}>
            <CardMedia
              image={UserImage}
              alt="User Image"
              sx={{ height: 175, backgroundSize: "contain", my: 3 }}
            />

            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Author
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Peter Kostelník, KOS0378
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>I
              am a student at the Faculty of Electrical Engineering and
              Informatics (VŠB-TUO), specializing in software development. I am
              currently in my 3rd year of bachelor's studies.
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                In my free time, I enjoy going to the gym and working out to
                stay fit and healthy.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
