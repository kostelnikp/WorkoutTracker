export async function loader({ params }) {
  try {
    const { id } = params;

    const response = await fetch(`http://localhost:3000/workouts/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const workout = await response.json();
    return { workout };
  } catch (error) {
    console.error("Error loading workout:", error);
    return { workout: null, error: "Failed to load workout details" };
  }
}
