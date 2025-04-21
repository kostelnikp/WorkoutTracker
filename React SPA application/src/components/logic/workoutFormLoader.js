import { redirect } from "react-router-dom";

export async function loader({ params }) {
  try {
    const exercisesResponse = await fetch("http://localhost:3000/exercises");

    if (!exercisesResponse.ok) {
      throw new Error(`HTTP error! Status: ${exercisesResponse.status}`);
    }

    const exercises = await exercisesResponse.json();

    const { id } = params;
    if (id) {
      try {
        const workoutResponse = await fetch(
          `http://localhost:3000/workouts/${id}`,
        );
        if (!workoutResponse.ok) {
          throw new Error(`HTTP error! Status: ${workoutResponse.status}`);
        }
        const workout = await workoutResponse.json();

        return {
          exercises,
          workout,
          isEditMode: true,
        };
      } catch (error) {
        console.error("Error loading workout:", error);
        return {
          exercises,
          workout: null,
          error: "Failed to load workout details",
          isEditMode: true,
        };
      }
    }

    return {
      exercises,
      isEditMode: false,
      workout: {
        name: "",
        date: new Date().toISOString().split("T")[0],
        duration: 0,
        note: "",
        exercises: [],
      },
    };
  } catch (error) {
    console.error("Error loading data for workout form:", error);
    return {
      exercises: [],
      workout: null,
      error: "Failed to load necessary data for the form",
      isEditMode: !!params.id,
    };
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const workoutExercisesStr = formData.get("workoutExercises");
  let workoutExercises = [];

  try {
    workoutExercises = JSON.parse(workoutExercisesStr);
  } catch (e) {
    console.error("Error parsing workout exercises:", e);
    return { ok: false, error: "Invalid exercise data format" };
  }

  let formattedDate;
  try {
    const rawDate = formData.get("date");
    const dateObj = new Date(rawDate);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toISOString();
    } else {
      formattedDate = new Date().toISOString();
    }
  } catch (e) {
    console.error("Error formatting date:", e);
    formattedDate = new Date().toISOString();
  }

  const workoutData = {
    name: formData.get("name"),
    date: formattedDate,
    duration: parseFloat(formData.get("duration") || 0),
    note: formData.get("note") || "",
    exercises: workoutExercises.map((ex) => ({
      exerciseId: ex.exerciseId,
      sets: parseInt(ex.sets, 10),
      reps: parseInt(ex.reps, 10),
      weight: parseFloat(ex.weight || 0),
      note: ex.note || "",
    })),
  };

  const { id } = params;
  const isEditMode = !!id;

  const url = isEditMode
    ? `http://localhost:3000/workouts/${id}`
    : "http://localhost:3000/workouts";

  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return redirect("/workouts");
  } catch (error) {
    console.error(
      `Error ${isEditMode ? "updating" : "creating"} workout:`,
      error,
    );
    return {
      ok: false,
      error: `Failed to ${isEditMode ? "update" : "create"} workout. Please try again.`,
    };
  }
}
