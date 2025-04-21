import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import App from "./App.jsx";
import Home from "./components/ui/Home.jsx";
import Workouts from "./components/ui/Workouts.jsx";
import Exercises from "./components/ui/Exercises.jsx";
import Stats from "./components/ui/Stats.jsx";
import ExerciseForm from "./components/ui/ExerciseForm.jsx";
import WorkoutForm from "./components/ui/WorkoutForm.jsx";
import WorkoutInfo from "./components/ui/WorkoutInfo.jsx";
import {
  loader as exercisesLoader,
  action as deleteExerciseAction,
} from "./components/logic/exercisesLoader.js";
import {
  loader as workoutsLoader,
  action as deleteWorkoutAction,
} from "./components/logic/workoutsLoader.js";
import {
  loader as exerciseFormLoader,
  action as exerciseFormAction,
} from "./components/logic/exerciseFormLoader.js";
import {
  loader as workoutFormLoader,
  action as workoutFormAction,
} from "./components/logic/workoutFormLoader.js";
import { loader as workoutInfoLoader } from "./components/logic/workoutInfoLoader.js";
import PageNotFound from "./components/ui/PageNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "workouts",
        children: [
          {
            index: true,
            element: <Workouts />,
            loader: workoutsLoader,
            action: deleteWorkoutAction,
          },
          {
            path: "new",
            element: <WorkoutForm />,
            loader: workoutFormLoader,
            action: workoutFormAction,
          },
          {
            path: ":id/edit",
            element: <WorkoutForm />,
            loader: workoutFormLoader,
            action: workoutFormAction,
          },
          {
            path: ":id",
            element: <WorkoutInfo />,
            loader: workoutInfoLoader,
          },
        ],
      },
      {
        path: "exercises",
        children: [
          {
            index: true,
            element: <Exercises />,
            loader: exercisesLoader,
            action: deleteExerciseAction,
          },
          {
            path: "new",
            element: <ExerciseForm />,
            action: exerciseFormAction,
          },
          {
            path: ":id/edit",
            element: <ExerciseForm />,
            loader: exerciseFormLoader,
            action: exerciseFormAction,
          },
        ],
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
