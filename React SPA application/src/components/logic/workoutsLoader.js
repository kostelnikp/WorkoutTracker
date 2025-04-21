export async function loader() {
  try {
    const response = await fetch("http://localhost:3000/workouts");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const workouts = await response.json();
    return { workouts };
  } catch (error) {
    console.error("Error loading workouts:", error);
    return {
      workouts: [],
      error: "Failed to load workouts. Please try again later.",
    };
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id");

  if (intent === "delete") {
    try {
      const response = await fetch(`http://localhost:3000/workouts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return { ok: true, message: "Workout deleted successfully" };
    } catch (error) {
      console.error("Error deleting workout:", error);
      return { ok: false, error: "Failed to delete workout" };
    }
  }

  return { ok: false, error: "Unknown action" };
}
