export async function fetchMapData(mapFilePath: string) {
  if (!mapFilePath.includes(".json")) {
    throw new Error("ERROR! Map file path is not valid.");
  }

  const response = await fetch(mapFilePath);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
