import { useLoaderData } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotesIcon from "@mui/icons-material/Notes";
import StraightenIcon from "@mui/icons-material/Straighten";
import RepeatIcon from "@mui/icons-material/Repeat";
import EditIcon from "@mui/icons-material/Edit";
import ScaleIcon from "@mui/icons-material/Scale";
import EqualizerIcon from "@mui/icons-material/Equalizer";

export default function WorkoutInfo() {
  const { workout } = useLoaderData();
  const { accentColor } = useOutletContext();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toDateString(options);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: accentColor }}
            component={Link}
            to="/workouts"
          >
            Back to workouts
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            sx={{ color: accentColor, borderColor: accentColor }}
            component={Link}
            to={`/workouts/${workout.id}/edit`}
          >
            Edit workout
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 2 }}>
          <Avatar
            alt="Workout Image"
            sx={{ bgcolor: accentColor, width: 64, height: 64, mr: 2 }}
          >
            <FitnessCenterIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            {workout.name}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonthIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body1">
                <strong>Date:</strong> {formatDate(workout.date)}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body1">
                <strong>Duration:</strong>{" "}
                {workout.duration
                  ? `${workout.duration} minutes`
                  : "Not specified"}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <NotesIcon sx={{ color: "text.secondary", mt: 0.5 }} />
              <Typography variant="body1">
                <strong>Notes:</strong>{" "}
                {workout.note ? `${workout.note}` : "No notes added"}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <RepeatIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body1">
                <strong>Total Sets:</strong>{" "}
                {workout.logs.reduce((total, log) => total + log.sets, 0)}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EqualizerIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body1">
                <strong>Total Volume:</strong>{" "}
                {workout.logs.reduce(
                  (total, log) =>
                    total + log.sets * log.reps * (log.weight || 0),
                  0,
                )}{" "}
                kg
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 2, fontWeight: 600, display: "flex", alignItems: "center" }}
        >
          <FitnessCenterIcon sx={{ mr: 1, color: accentColor }} />
          Exercises ({workout.logs.length})
        </Typography>

        {workout.logs.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", py: 3, color: "text.secondary" }}
          >
            No exercises added to this workout.
          </Typography>
        ) : (
          <List>
            {workout.logs.map((log) => (
              <Card key={log.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {log.exercise.name}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid size={{ xs: 4 }}>
                      <Chip
                        icon={<RepeatIcon />}
                        label={`${log.sets} sets`}
                        size="small"
                        sx={{
                          bgcolor: `${accentColor}22`,
                          color: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Chip
                        icon={<RepeatIcon />}
                        label={`${log.reps} reps`}
                        size="small"
                        sx={{
                          bgcolor: `${accentColor}22`,
                          color: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Chip
                        icon={<StraightenIcon />}
                        label={log.weight ? `${log.weight} kg` : "No weight"}
                        size="small"
                        sx={{
                          bgcolor: `${accentColor}22`,
                          color: "text.primary",
                        }}
                      />
                    </Grid>
                  </Grid>

                  {log.note && (
                    <Box
                      sx={{ mt: 1, display: "flex", alignItems: "flex-start" }}
                    >
                      <NotesIcon
                        fontSize="small"
                        sx={{ mr: 1, color: "text.secondary", mt: 0.3 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {log.note}
                      </Typography>
                    </Box>
                  )}

                  {log.exercise.muscleGroup && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, fontStyle: "italic" }}
                    >
                      Muscle group: {log.exercise.muscleGroup}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}
