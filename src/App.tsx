import "./App.css";
import { Excalidraw, MainMenu, loadFromBlob } from "@excalidraw/excalidraw";
import useDropboxChooser from "use-dropbox-chooser";
import React from "react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

function App() {
  const { open } = useDropboxChooser({
    appKey: "81braykdvzmr4gq",
    chooserOptions: { linkType: "direct" },
    onSelected: (files) => {
      console.log(files);
    },
  });

  const excalidrawRef = React.useRef<ExcalidrawImperativeAPI>(null);

  return (
    <Excalidraw ref={excalidrawRef}>
      <MainMenu>
        <MainMenu.DefaultItems.LoadScene />
        <MainMenu.Item
          onSelect={async () => {
            try {
              const selected = await open();
              const blob = await fetch(selected[0].link).then((r) => r.blob());

              const data = await loadFromBlob(blob, null, null);

              excalidrawRef.current!.updateScene({
                elements: data.elements,
                appState: data.appState,
              });
              excalidrawRef.current!.scrollToContent();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Dropbox
        </MainMenu.Item>
      </MainMenu>
    </Excalidraw>
  );
}

export default App;
