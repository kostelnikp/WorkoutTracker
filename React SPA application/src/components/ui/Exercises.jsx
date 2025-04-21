import * as React from "react";
import {
  useLoaderData,
  useSubmit,
  useOutletContext,
  Link,
} from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Paper,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function Exercises() {
  const { exercises, error } = useLoaderData();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [exerciseToDelete, setExerciseToDelete] = React.useState(null);
  const submit = useSubmit();
  const { accentColor } = useOutletContext();



  const handleDeleteClick = (exercise) => {
    setExerciseToDelete(exercise);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!exerciseToDelete) return;

    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", exerciseToDelete.id);

    submit(formData, { method: "delete" });
    setDeleteDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setExerciseToDelete(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Exercises
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/exercises/new"
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            textTransform: "none",
            fontWeight: "bold",
            py: 1,
            backgroundColor: accentColor,
          }}
        >
          Add new exercise
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {exercises.length === 0 ? (
        <Paper
          elevation={1}
          sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
        >
          <Typography variant="body1">
            No exercises found. Click the button above to add your first
            exercise!
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <List>
            {exercises.map((exercise, index) => (
              <React.Fragment key={exercise.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        color="primary"
                        component={Link}
                        to={`/exercises/${exercise.id}/edit`}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteClick(exercise)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                  sx={{ p: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: accentColor }}>
                      <FitnessCenterIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="div">
                        {exercise.name}
                      </Typography>
                    }
                    secondary={
                      <Box component="span" sx={{ display: "block" }}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          component="span"
                          sx={{ mt: 1 }}
                        >
                          {exercise.muscleGroup && (
                            <Box
                              component="span"
                              sx={{ display: "block", fontWeight: "bold" }}
                            >
                              Muscle group: {exercise.muscleGroup}
                            </Box>
                          )}
                        </Typography>
                        {exercise.description && (
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ mt: 1 }}
                          >
                            {exercise.description}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < exercises.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the exercise "
            {exerciseToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            sx={{ color: accentColor }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
