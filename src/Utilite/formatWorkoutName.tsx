export default function formatWorkoutName(name: string | unknown) {
  if (typeof name !== "string") return { title: "", subtitle: "" };

  if (name.includes(" / ")) {
    const parts = name.split(" / ");
    const mainParts = parts.slice(0, -1);
    return {
      title: mainParts[0]?.trim() || "",
      subtitle: mainParts.slice(1).join(" / ") || "",
    };
  }

  return {
    title: name,
    subtitle: "",
  };
}
