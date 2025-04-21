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
  Chip,
  Stack,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotesIcon from "@mui/icons-material/Notes";
import InfoIcon from "@mui/icons-material/Info";

export default function Workouts() {
  const { workouts, error } = useLoaderData();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [workoutToDelete, setWorkoutToDelete] = React.useState(null);
  const submit = useSubmit();
  const { accentColor } = useOutletContext();

 

  const handleDeleteClick = (workout) => {
    setWorkoutToDelete(workout);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!workoutToDelete) return;

    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", workoutToDelete.id);

    submit(formData, { method: "delete" });
    setDeleteDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setWorkoutToDelete(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toDateString(options);
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
          Workouts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/workouts/new"
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            textTransform: "none",
            fontWeight: "bold",
            py: 1,
            backgroundColor: accentColor,
          }}
        >
          Add new workout
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!workouts || workouts.length === 0 ? (
        <Paper
          elevation={1}
          sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
        >
          <Typography variant="body1">
            No workouts found. Click the button above to add your first workout!
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <List>
            {workouts.map((workout, index) => (
              <React.Fragment key={workout.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="info"
                        component={Link}
                        to={`/workouts/${workout.id}`}
                        sx={{ mr: 1, color: accentColor }}
                      >
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        color="primary"
                        component={Link}
                        to={`/workouts/${workout.id}/edit`}

                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteClick(workout)}
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
                        {workout.name}
                      </Typography>
                    }
                    secondary={
                      <Box component="div" sx={{ display: "block" }}>
                        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                          <Chip
                            icon={<CalendarMonthIcon fontSize="small" />}
                            label={formatDate(workout.date)}
                            size="small"
                            variant="outlined"
                          />
                          {workout.duration && workout.duration > 0 ? (
                            <Chip
                              icon={<AccessTimeIcon fontSize="small" />}
                              label={`${workout.duration} minutes`}
                              size="small"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              icon={<AccessTimeIcon fontSize="small" />}
                              label="N/A"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Stack>

                        {workout.logs.length > 0 && (
                          <Typography
                            variant="body2"
                            component="div"
                            sx={{ mt: 1, display: "block" }}
                          >
                            <Box component="span" sx={{ fontWeight: "bold" }}>
                              Exercises: {workout.logs.length}
                            </Box>
                          </Typography>
                        )}

                        {workout.note && (
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{
                              mt: 1,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <NotesIcon
                              fontSize="small"
                              sx={{ mr: 1, color: "text.secondary" }}
                            />
                            {workout.note}
                          </Typography>
                        )}
                      </Box>
                    }
                    disableTypography
                  />
                </ListItem>
                {index < workouts.length - 1 && (
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
        <DialogTitle id="alert-dialog-title">Delete Workout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the workout "{workoutToDelete?.name}
            "? This action cannot be undone.
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
