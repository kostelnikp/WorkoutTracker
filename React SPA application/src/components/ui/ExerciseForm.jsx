// filepath: d:\Skola\Vysoka\VAJ\2025s-project-kos0378\React SPA application\src\components\ui\ExerciseForm.jsx
import * as React from "react";
import {
  useLoaderData,
  useParams,
  Form,
  useOutletContext,
  Link,
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
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ExerciseForm() {
  const { id } = useParams();
  const { exercise, error } = useLoaderData() || {};
  const { accentColor } = useOutletContext();

  const isEditMode = !!id;

  const initialFormData = exercise || {
    name: "",
    description: "",
    muscleGroup: "",
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [formError, setFormError] = React.useState(error || null);

  React.useEffect(() => {
    // Reset form data when exercise changes (e.g., when loading data)
    if (exercise) {
      setFormData({
        name: exercise.name || "",
        description: exercise.description || "",
        muscleGroup: exercise.muscleGroup || "",
      });
    }
  }, [exercise]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/exercises"
            sx={{ mb: 2, color: accentColor }}
          >
            Back to exercises
          </Button>

          <Typography variant="h4" component="h1" gutterBottom>
            {isEditMode ? "Edit exercise" : "Add new exercise"}
          </Typography>

          {formError && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {formError}
            </Alert>
          )}
        </Box>

        <Form method={isEditMode ? "put" : "post"}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                color={accentColor}
              >
                Name of exercise*:
              </Typography>
              <TextField
                autoFocus
                required
                id="name"
                name="name"
                placeholder="Enter exercise name"
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
                Description of exercise:
              </Typography>
              <TextField
                multiline
                rows={3}
                id="description"
                name="description"
                placeholder="Enter detailed description"
                fullWidth
                variant="outlined"
                value={formData.description}
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

            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="medium"
                color={accentColor}
              >
                Muscle group:
              </Typography>
              <TextField
                id="muscleGroup"
                name="muscleGroup"
                placeholder="E.g. Arms, Legs, Core"
                fullWidth
                variant="outlined"
                value={formData.muscleGroup}
                onChange={handleInputChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon sx={{ color: accentColor }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

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
                to="/exercises"
                sx={{ borderRadius: 2, px: 3 }}
                color="error"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: 2, px: 3 }}
                color="success"
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
