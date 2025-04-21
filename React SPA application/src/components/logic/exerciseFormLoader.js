import { redirect } from "react-router-dom";

export async function loader({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`http://localhost:3000/exercises/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const exercise = await response.json();
    return { exercise };
  } catch (error) {
    console.error("Error loading exercise details:", error);
    return {
      exercise: null,
      error:
        "Failed to load exercise details. The exercise might have been deleted or there is a connection issue.",
    };
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const exerciseData = {
    name: formData.get("name"),
    description: formData.get("description") || "",
    muscleGroup: formData.get("muscleGroup") || "",
  };

  const { id } = params;
  const isEditMode = !!id;

  const url = isEditMode
    ? `http://localhost:3000/exercises/${id}`
    : "http://localhost:3000/exercises";

  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return redirect("/exercises");
  } catch (error) {
    console.error(
      `Error ${isEditMode ? "updating" : "creating"} exercise:`,
      error,
    );
    return {
      ok: false,
      error: `Failed to ${isEditMode ? "update" : "create"} exercise. Please try again.`,
    };
  }
}
