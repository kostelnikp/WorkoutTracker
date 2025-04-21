export async function loader() {
  try {
    const response = await fetch("http://localhost:3000/exercises");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const exercises = await response.json();
    return { exercises };
  } catch (error) {
    console.error("Error loading exercises:", error);
    return {
      exercises: [],
      error: "Failed to load exercises. Please try again later.",
    };
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id");

  if (intent === "delete") {
    try {
      const response = await fetch(`http://localhost:3000/exercises/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return { ok: true, message: "Exercise deleted successfully" };
    } catch (error) {
      console.error("Error deleting exercise:", error);
      return { ok: false, error: "Failed to delete exercise" };
    }
  }

  return { ok: false, error: "Unknown action" };
}
