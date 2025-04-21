// filepath: d:\Skola\Vysoka\VAJ\2025s-project-kos0378\React SPA application\src\components\ui\WorkoutForm.jsx
import * as React from "react";
import {
  useLoaderData,
  Form,
  useActionData,
  useOutletContext,
} from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  InputAdornment,
  Button,
  TextField,
  Paper,
  Container,
  Alert,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function WorkoutForm() {
  const actionData = useActionData();

  const {
    workout,
    exercises = [],
    error,
    isEditMode = false,
  } = useLoaderData() || {};

  const { accentColor } = useOutletContext();

  const [workoutExercises, setWorkoutExercises] = React.useState(
    workout?.logs || [],
  );
  const [selectedExercise, setSelectedExercise] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: workout?.name || "",
    date: workout?.date
      ? workout.date.split("T")[0]
      : new Date().toISOString().split("T")[0],
    duration: workout?.duration || "",
    note: workout?.note || "",
  });

  React.useEffect(() => {
    if (exercises.length > 0 && !selectedExercise) {
      setSelectedExercise(exercises[0].id);
    }

    if (workout?.exercises) {
      const enrichedExercises = workout.exercises.map((ex) => {
        const exerciseData =
          exercises.find((e) => e.id === ex.exerciseId) || {};
        return {
          ...ex,
          exerciseName: exerciseData.name || "Unknown Exercise",
        };
      });

      setWorkoutExercises(enrichedExercises);
    }
  }, [exercises, selectedExercise, workout]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addExerciseToWorkout = () => {
    const exerciseToAdd = exercises.find((ex) => ex.id === selectedExercise);
    if (!exerciseToAdd) return;

    const newWorkoutExercise = {
      workoutId: workout?.id,
      exerciseId: exerciseToAdd.id,
      sets: 3,
      reps: 10,
      weight: null,
      note: null,
      exercise: {
        id: exerciseToAdd.id,
        name: exerciseToAdd.name,
        description: exerciseToAdd.description || "",
        muscleGroup: exerciseToAdd.muscleGroup || "",
      },
    };

    setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
  };

  const removeExerciseFromWorkout = (index) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises.splice(index, 1);
    setWorkoutExercises(updatedExercises);
  };

  const updateWorkoutExercise = (index, field, value) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises[index][field] = value;
    setWorkoutExercises(updatedExercises);
  };

  const formHasError = !!actionData?.error || !!error;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2, color: accentColor }}
            component={Link}
            to="/workouts"
          >
            Back to workouts
          </Button>

          <Typography variant="h4" component="h1" gutterBottom>
            {isEditMode ? "Edit workout" : "Add new workout"}
          </Typography>

          {formHasError && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {actionData?.error || error}
            </Alert>
          )}
        </Box>

        <Form method={isEditMode ? "put" : "post"}>
          <input
            type="hidden"
            name="workoutExercises"
            value={JSON.stringify(workoutExercises)}
          />

          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                sx={{ color: accentColor }}
              >
                Workout name*:
              </Typography>
              <TextField
                autoFocus
                required
                id="name"
                name="name"
                placeholder="Enter workout name"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FitnessCenterIcon sx={{ color: accentColor }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                color={accentColor}
              >
                Date
              </Typography>
              <TextField
                id="date"
                name="date"
                type="date"
                fullWidth
                variant="outlined"
                value={formData.date}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon sx={{ color: accentColor }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                color={accentColor}
              >
                Duration (minutes)
              </Typography>
              <TextField
                id="duration"
                name="duration"
                type="number"
                placeholder="Enter workout duration"
                fullWidth
                variant="outlined"
                value={formData.duration}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon sx={{ color: accentColor }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                color={accentColor}
              >
                Notes
              </Typography>
              <TextField
                multiline
                rows={3}
                id="note"
                name="note"
                placeholder="Enter any notes about this workout"
                fullWidth
                variant="outlined"
                value={formData.note}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon sx={{ color: accentColor }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              sx={{ color: accentColor }}
              fontWeight="bold"
            >
              Exercises
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: accentColor,
              }}
            >
              <FormControl sx={{ flexGrow: 1 }}>
                <Select
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  displayEmpty
                  fullWidth
                >
                  {exercises.length === 0 ? (
                    <MenuItem disabled value="">
                      No exercises available
                    </MenuItem>
                  ) : (
                    exercises.map((exercise) => (
                      <MenuItem key={exercise.id} value={exercise.id}>
                        Name: {exercise.name}, Muscle Group:{" "}
                        {exercise.muscleGroup || "Not specified"}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={addExerciseToWorkout}
                startIcon={<AddIcon />}
                disabled={exercises.length === 0}
                sx={{ backgroundColor: accentColor, color: "white" }}
              >
                Add
              </Button>
            </Box>

            {workoutExercises.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  fontWeight="medium"
                  sx={{ color: accentColor }}
                >
                  Added exercises:
                </Typography>

                <Stack spacing={2}>
                  {workoutExercises.map((exercise, index) => (
                    <Paper
                      key={index}
                      elevation={1}
                      sx={{ p: 2, borderRadius: 2 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {exercise.exercise.name}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeExerciseFromWorkout(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        <TextField
                          label="Sets"
                          type="number"
                          value={exercise.sets}
                          onChange={(e) =>
                            updateWorkoutExercise(index, "sets", e.target.value)
                          }
                          sx={{ width: "30%", minWidth: "80px" }}
                          size="small"
                          slotProps={{ slotProps: { min: 1 } }}
                        />
                        <TextField
                          label="Reps"
                          type="number"
                          value={exercise.reps}
                          onChange={(e) =>
                            updateWorkoutExercise(index, "reps", e.target.value)
                          }
                          sx={{ width: "30%", minWidth: "80px" }}
                          size="small"
                          slotProps={{ slotProps: { min: 1 } }}
                        />
                        <TextField
                          label="Weight (kg)"
                          type="number"
                          value={exercise.weight}
                          onChange={(e) =>
                            updateWorkoutExercise(
                              index,
                              "weight",
                              e.target.value,
                            )
                          }
                          sx={{ width: "30%", minWidth: "80px" }}
                          size="small"
                          slotProps={{ slotProps: { min: 0, step: 0.5 } }}
                        />
                      </Box>

                      <TextField
                        label="Note"
                        value={exercise.note}
                        onChange={(e) =>
                          updateWorkoutExercise(index, "note", e.target.value)
                        }
                        size="small"
                        fullWidth
                        sx={{ mt: 2 }}
                      />
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                component={Link}
                to="/workouts"
                color="error"
                sx={{ borderRadius: 2, px: 3 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ borderRadius: 2, px: 3 }}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </Form>
      </Paper>
    </Container>
  );
}
