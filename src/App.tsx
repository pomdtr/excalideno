import "./App.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types";

const params = new URLSearchParams(window.location.search);
const drawingID = params.get("id");

async function fetchDrawing(
  drawingID: string
): Promise<ExcalidrawInitialDataState> {
  console.log(`Fetching drawing ${drawingID}`);

  const res = await fetch(`/api/drawings/${drawingID}`);
  if (!res.ok) {
    console.error("Failed to fetch drawing");
    return {};
  }
  const data = await res.json();
  return data;
}

function App() {
  return (
    <Excalidraw initialData={drawingID ? fetchDrawing(drawingID) : undefined} />
  );
}

export default App;
