import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create new exercise
app.post("/exercises", async (req, res) => {
  try {
    const { name, description, muscleGroup } = req.body;

    const newExercise = await prisma.exercise.create({
      data: {
        name: name,
        description: description,
        muscleGroup: muscleGroup,
      },
    });

    if (newExercise) res.status(201).json(newExercise);
    else res.status(404).json({ error: "Exercise not created." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error creating the exercise." });
  }
});

// Get all exercises
app.get("/exercises", async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany();

    if (exercises) res.status(200).json(exercises);
    else res.status(404).json({ error: "No exercises found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error getting exercises." });
  }
});

// Get specific exercise
app.get("/exercises/:exerciseId", async (req, res) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: parseInt(req.params.exerciseId),
      },
    });

    if (exercise) res.status(200).json(exercise);
    else res.status(404).json({ error: "Exercise with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error getting the exercise." });
  }
});

// Update specific exercise
app.put("/exercises/:exerciseId", async (req, res) => {
  try {
    const { name, description, muscleGroup } = req.body;

    const updatedExercise = await prisma.exercise.update({
      where: {
        id: parseInt(req.params.exerciseId),
      },
      data: {
        name: name,
        description: description,
        muscleGroup: muscleGroup,
      },
    });

    if (updatedExercise) res.status(200).json(updatedExercise);
    else res.status(404).json({ error: "Exercise with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error updating the exercise." });
  }
});

// Delete specific exercise
app.delete("/exercises/:exerciseId", async (req, res) => {
  try {
    const deletedExercise = await prisma.exercise.delete({
      where: {
        id: parseInt(req.params.exerciseId),
      },
    });

    if (deletedExercise) res.status(200).json(deletedExercise);
    else res.status(404).json({ error: "Exercise with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error deleting the exercise." });
  }
});

// Create new workout
app.post("/workouts", async (req, res) => {
  try {
    const { name, date, duration, volume, totalSets, note, exercises } = req.body;

    const newWorkout = await prisma.workout.create({
      data: {
        name: name,
        date: date,
        duration: duration || 0,
        volume: volume,
        totalSets: totalSets,
        note: note,
        logs: exercises ? {
          create: exercises.map(ex => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight || null,
            note: ex.note || null
          }))
        } : undefined
      },
      include: {
        logs: {
          include: {
            exercise: true
          }
        }
      }
    });

    if (newWorkout) res.status(201).json(newWorkout);
    else res.status(404).json({ error: "Workout not created." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error creating the workout." });
  }
});

// Get all workouts
app.get("/workouts", async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        logs: {
          include: {
            exercise: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    if (workouts) res.status(200).json(workouts);
    else res.status(404).json({ error: "No workouts found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error getting workouts." });
  }
});

// Get specific workout
app.get("/workouts/:workoutId", async (req, res) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: parseInt(req.params.workoutId),
      },
      include: {
        logs: {
          include: {
            exercise: true // Include the exercise details for each log
          }
        }
      }
    });

    if (workout) res.status(200).json(workout);
    else res.status(404).json({ error: "Workout with that ID not found." });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "There was a server error getting the workout." });
  }
});

// Update specific workout
app.put("/workouts/:workoutId", async (req, res) => {
  try {
    const { name, date, duration, volume, totalSets, note, exercises } = req.body;
    const workoutId = parseInt(req.params.workoutId);

    const updatedWorkout = await prisma.$transaction(async (tx) => {
      const workout = await tx.workout.update({
        where: {
          id: workoutId,
        },
        data: {
          name: name,
          date: date,
          duration: duration || 0,
          volume: volume,
          totalSets: totalSets,
          note: note,
        },
      });

      if (exercises && exercises.length > 0) {
        const existingLogs = await tx.exerciseLog.findMany({
          where: { workoutId }
        });
        
        // Delete existing logs that are not in the updated list
        // This is needed as we're replacing all exercise logs
        await tx.exerciseLog.deleteMany({
          where: { workoutId }
        });
        
        // Create new exercise logs
        await tx.exerciseLog.createMany({
          data: exercises.map(ex => ({
            workoutId,
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight || null,
            note: ex.note || null
          }))
        });
      }

      // Return the updated workout with its logs
      return tx.workout.findUnique({
        where: { id: workoutId },
        include: {
          logs: {
            include: {
              exercise: true
            }
          }
        }
      });
    });

    if (updatedWorkout) res.status(200).json(updatedWorkout);
    else res.status(404).json({ error: "Workout with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error updating the workout." });
  }
});

// Delete specific workout
app.delete("/workouts/:workoutId", async (req, res) => {
  try {
    const deletedWorkout = await prisma.workout.delete({
      where: {
        id: parseInt(req.params.workoutId),
      },
    });

    if (deletedWorkout) res.status(200).json(deletedWorkout);
    else res.status(404).json({ error: "Workout with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error deleting the workout." });
  }
});

// Create new workoutExercise
app.post("/workoutExercises", async (req, res) => {
  try {
    const { workoutId, exerciseId, sets, reps, weight, note } = req.body;

    const newWorkoutExercise = await prisma.workoutExercise.create({
      data: {
        workoutId: workoutId,
        exerciseId: exerciseId,
        sets: sets,
        reps: reps,
        weight: weight,
        note: note,
      },
    });

    if (newWorkoutExercise) res.status(201).json(newWorkoutExercise);
    else res.status(404).json({ error: "WorkoutExercise not created." });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "There was a server error creating the workoutExercise.",
    });
  }
});

// Get all workoutExercises
app.get("/workoutExercises", async (req, res) => {
  try {
    const workoutExercises = await prisma.workoutExercise.findMany();

    if (workoutExercises) res.status(200).json(workoutExercises);
    else res.status(404).json({ error: "No workoutExercises found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error getting workoutExercises." });
  }
});

// Get specific workoutExercise
app.get("/workoutExercises/:workoutExerciseId", async (req, res) => {
  try {
    const workoutExercise = await prisma.workoutExercise.findUnique({
      where: {
        id: parseInt(req.params.workoutExerciseId),
      },
    });

    if (workoutExercise) res.status(200).json(workoutExercise);
    else
      res
        .status(404)
        .json({ error: "WorkoutExercise with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "There was a server error getting the workoutExercise." });
  }
});

// Update specific workoutExercise
app.put("/workoutExercises/:workoutExerciseId", async (req, res) => {
  try {
    const { workoutId, exerciseId, sets, reps, weight, note } = req.body;

    const updatedWorkoutExercise = await prisma.workoutExercise.update({
      where: {
        id: parseInt(req.params.workoutExerciseId),
      },
      data: {
        workoutId: workoutId,
        exerciseId: exerciseId,
        sets: sets,
        reps: reps,
        weight: weight,
        note: note,
      },
    });

    if (updatedWorkoutExercise) res.status(200).json(updatedWorkoutExercise);
    else
      res
        .status(404)
        .json({ error: "WorkoutExercise with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({
        error: "There was a server error updating the workoutExercise.",
      });
  }
});

// Delete specific workoutExercise
app.delete("/workoutExercises/:workoutExerciseId", async (req, res) => {
  try {
    const deletedWorkoutExercise = await prisma.workoutExercise.delete({
      where: {
        id: parseInt(req.params.workoutExerciseId),
      },
    });

    if (deletedWorkoutExercise) res.status(200).json(deletedWorkoutExercise);
    else
      res
        .status(404)
        .json({ error: "WorkoutExercise with that ID not found." });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({
        error: "There was a server error deleting the workoutExercise.",
      });
  }
});

export { app };
